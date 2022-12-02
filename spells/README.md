# Deploy
```
aqua -i spell_script.aqua --air --scheduled -o .
aqua run -i . -f 'deploy_spell("spell_script.run.air", 10)' --addr stage-01 --plugin .
```

# Query

CHANGE SPELL_ID IN `deploy.aqua` FILE!!!

```
aqua run -i . -f 'query_spell()' --addr stage-01 --plugin .
```
