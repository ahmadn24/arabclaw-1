#!/bin/bash
# Cron : génère + déploie 1 article blog arabclaw tous les 2 jours

set -e
cd /Users/leoc/Projects/arabclaw

echo "[arabclaw blog cron] $(date)"

# Récupérer ANTHROPIC_API_KEY depuis openclaw.json
ANTHROPIC_API_KEY=$(python3 -c "
import json
with open('/Users/leoc/.openclaw/openclaw.json') as f:
    c = json.load(f)
key = c.get('env', {}).get('ANTHROPIC_API_KEY', '')
print(key.replace('\n', '').strip())
")
export ANTHROPIC_API_KEY

VERCEL_TOKEN=$(python3 -c "
import json
with open('/Users/leoc/.openclaw/openclaw.json') as f:
    c = json.load(f)
key = c.get('env', {}).get('VERCEL_TOKEN', '')
print(key.replace('\n', '').strip())
")
export VERCEL_TOKEN

# Générer article
node scripts/generate-article.mjs >> /tmp/arabclaw-blog-cron.log 2>&1 || { echo "Génération échouée"; exit 1; }

# Git commit + push
git add -A
git diff --cached --quiet && echo "Rien à commiter, slug existant." && exit 0
git commit -m "cron: article blog $(date +%Y-%m-%d)"
git push

# Deploy Vercel
npx vercel --token "$VERCEL_TOKEN" --prod --yes >> /tmp/arabclaw-blog-cron.log 2>&1

# Résultat
LAST_LOG=$(tail -10 /tmp/arabclaw-blog-cron.log)
echo "$LAST_LOG"
echo "[arabclaw blog cron] OK"
