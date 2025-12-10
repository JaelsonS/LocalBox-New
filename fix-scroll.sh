#!/bin/bash

# Após build do Expo, modificar o CSS para permitir scroll
sed -i '' 's/body {[^}]*overflow: hidden;[^}]*}/body { overflow: auto; }/' dist/index.html

echo "✅ HTML patched: body overflow changed to auto"
