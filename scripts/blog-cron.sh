#!/bin/bash
# ArabClaw blog cron — génère, déploie, notifie Telegram
set -e
cd /Users/leoc/Projects/arabclaw

LOG=/tmp/arabclaw-blog-cron.log
echo "" >> "$LOG"
echo "[arabclaw cron] $(date)" | tee -a "$LOG"

# ── Clés ──────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY=$(python3 -c "
import json
with open('/Users/leoc/.openclaw/openclaw.json') as f:
    c = json.load(f)
print(c.get('env', {}).get('ANTHROPIC_API_KEY', '').strip())
")
export ANTHROPIC_API_KEY

VERCEL_TOKEN=$(python3 -c "
import json
with open('/Users/leoc/.openclaw/openclaw.json') as f:
    c = json.load(f)
print(c.get('env', {}).get('VERCEL_TOKEN', '').strip())
")
export VERCEL_TOKEN

TG_TOKEN=$(python3 -c "
import json
with open('/Users/leoc/.openclaw/openclaw.json') as f:
    c = json.load(f)
print(c.get('channels',{}).get('telegram',{}).get('accounts',{}).get('default',{}).get('botToken',''))
")
TG_CHAT_ID="5586671893"

# ── Génération article ────────────────────────────────────────────────────
echo "📝 Génération article..." | tee -a "$LOG"
GEN_OUTPUT=$(node scripts/generate-article.mjs 2>&1) || {
  echo "❌ Génération échouée" | tee -a "$LOG"
  echo "$GEN_OUTPUT" >> "$LOG"
  exit 1
}
echo "$GEN_OUTPUT" | tee -a "$LOG"

# Extraire infos publication
SLUG=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_SLUG=" | cut -d= -f2-)
TITLE=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_TITLE=" | cut -d= -f2-)
WORDS=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_WORDS=" | cut -d= -f2-)
CATEGORY=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_CATEGORY=" | cut -d= -f2-)
TITLE_FR=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_TITLE_FR=" | cut -d= -f2-)
HIGHLIGHTS_RAW=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_HIGHLIGHTS=" | cut -d= -f2-)
TARGET=$(echo "$GEN_OUTPUT" | grep "^PUBLISH_TARGET=" | cut -d= -f2-)

if [ -z "$SLUG" ]; then
  echo "⚠️  Aucun article publié (doublon ou liste épuisée)." | tee -a "$LOG"
  exit 0
fi

# ── Git commit + push ─────────────────────────────────────────────────────
echo "📤 Git push..." | tee -a "$LOG"
git add -A
git diff --cached --quiet && { echo "Rien à commiter."; exit 0; }
git commit -m "cron: article blog $SLUG" >> "$LOG" 2>&1
COMMIT_HASH=$(git log --format=%h -1)
git push >> "$LOG" 2>&1

# ── Déploiement Vercel ────────────────────────────────────────────────────
echo "🚀 Déploiement Vercel..." | tee -a "$LOG"
npx vercel --token "$VERCEL_TOKEN" --prod --yes >> "$LOG" 2>&1
echo "✅ Deploy OK" | tee -a "$LOG"

# ── Notification Telegram ─────────────────────────────────────────────────
URL="https://arabclaw.com/blog/${SLUG}"
TODAY=$(date +%Y-%m-%d)

# Construire les points forts (pipe-séparés → lignes)
HIGHLIGHTS_LINES=""
if [ -n "$HIGHLIGHTS_RAW" ]; then
  IFS='|' read -ra HARRAY <<< "$HIGHLIGHTS_RAW"
  for h in "${HARRAY[@]}"; do
    [ -n "$h" ] && HIGHLIGHTS_LINES="${HIGHLIGHTS_LINES}• ${h}"$'\n'
  done
fi

# Construire le message complet
NL=$'\n'
MSG="✅ Article publié avec succès !${NL}${NL}"
MSG="${MSG}📌 Titre: ${TITLE}${NL}"
[ -n "$TITLE_FR" ] && MSG="${MSG}(${TITLE_FR})${NL}"
MSG="${MSG}${NL}📊 Statistiques:${NL}"
MSG="${MSG}• Nombre de mots: ${WORDS} mots${NL}"
[ -n "$CATEGORY" ] && MSG="${MSG}• Catégorie: ${CATEGORY}${NL}"
MSG="${MSG}• Date: ${TODAY}${NL}"
MSG="${MSG}• Slug: ${SLUG}${NL}"
MSG="${MSG}${NL}🔗 URL prévue: ${URL}${NL}"
if [ -n "$HIGHLIGHTS_LINES" ]; then
  MSG="${MSG}${NL}✨ Points forts:${NL}${HIGHLIGHTS_LINES}"
fi
[ -n "$TARGET" ] && MSG="${MSG}${NL}🎯 Public cible: ${TARGET}${NL}"
MSG="${MSG}${NL}📝 Commit: ${COMMIT_HASH} → Push réussi vers origin/main"

# Envoyer via Python (gère mieux l'encodage multilingue)
python3 - <<PYEOF >> "$LOG" 2>&1
import urllib.request, urllib.parse, json

token = "${TG_TOKEN}"
chat_id = "${TG_CHAT_ID}"
text = """${MSG}"""

data = json.dumps({"chat_id": chat_id, "text": text}).encode("utf-8")
req = urllib.request.Request(
    f"https://api.telegram.org/bot{token}/sendMessage",
    data=data,
    headers={"Content-Type": "application/json"}
)
urllib.request.urlopen(req)
print("✅ Telegram notif envoyée")
PYEOF

echo "[arabclaw cron] DONE — $SLUG" | tee -a "$LOG"
