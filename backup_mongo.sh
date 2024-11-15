#!/bin/bash

# Répertoires à sauvegarder
SOURCE_DIR="/home/rose/LaCapsule/MN-avengers/morning-news"
BACKUP_DIR="/home/rose/LaCapsule/MN-avengers/morning-news/backups"

# Crée un répertoire de sauvegarde avec la date
DATE=$(date +\%Y-\%m-\%d_\%H-\%M-\%S)
DEST="$BACKUP_DIR/backup_$DATE"

# Crée le répertoire de destination
mkdir -p "$DEST"

# Sauvegarde des fichiers avec rsync
rsync -av --delete "$SOURCE_DIR" "$DEST"

# Affiche un message de confirmation
echo "Sauvegarde terminée: $DEST"
