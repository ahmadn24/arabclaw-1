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

if [ -z "$SLUG" ]; then
  echo "⚠️  Aucun article publié (doublon ou liste épuisée)." | tee -a "$LOG"
  exit 0
fi

# ── Git commit + push ─────────────────────────────────────────────────────
echo "📤 Git push..." | tee -a "$LOG"
git add -A
git diff --cached --quiet && { echo "Rien à commiter."; exit 0; }
git commit -m "cron: article blog $SLUG" >> "$LOG" 2>&1
git push >> "$LOG" 2>&1

# ── Déploiement Vercel ────────────────────────────────────────────────────
echo "🚀 Déploiement Vercel..." | tee -a "$LOG"
npx vercel --token "$VERCEL_TOKEN" --prod --yes >> "$LOG" 2>&1
echo "✅ Deploy OK" | tee -a "$LOG"

# ── Notification Telegram ─────────────────────────────────────────────────
URL="https://arabclaw.com/blog/${SLUG}"
MSG="✅ *ArabClaw* — Nouvel article publié%0A%0A📄 *${TITLE}*%0A📊 ${WORDS} mots%0A🔗 ${URL}"

curl -s "https://api.telegram.org/bot${TG_TOKEN}/sendMessage" \
  -d "chat_id=${TG_CHAT_ID}" \
  -d "text=${MSG}" \
  -d "parse_mode=Markdown" >> "$LOG" 2>&1

echo "[arabclaw cron] DONE — $SLUG" | tee -a "$LOG"
