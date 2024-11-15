  GNU nano 7.2                                                                          mongodb-backup.sh                                                                                    
#!/bin/bash

# Configuration des répertoires et MongoDB URI
BACKUP_DIR="/home/ubuntu/backups"
MONGO_URI="mongodb+srv://alexis-lacapsule:wDRf72jOMblA8C8C@cluster0.5etmg.mongodb.net"
DB_NAME="morning-news"  # Nom de ta base de données sur MongoDB Atlas

# Crée un répertoire de sauvegarde avec la date
DATE=$(date +\%Y-\%m-\%d_\%H-\%M-\%S)
DEST="$BACKUP_DIR/backup_$DATE"

# Crée le répertoire de destination
mkdir -p "$DEST"

# Sauvegarde de la base de données MongoDB avec mongodump
echo "Sauvegarde de la base de données MongoDB..."
mongodump --uri="$MONGO_URI" --db="$DB_NAME" --out="$DEST/mongodb"

# Vérifie si mongodump a réussi
if [ $? -eq 0 ]; then
  echo "Sauvegarde de la base de données MongoDB terminée: $DEST/mongodb"
else
  echo "Erreur lors de la sauvegarde de la base de données MongoDB"
  exit 1
fi

# Affiche un message de confirmation
echo "Sauvegarde complète terminée: $DEST"