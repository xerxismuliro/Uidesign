#!/bin/bash

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null
then
    echo "yt-dlp could not be found, please install it first."
    exit
fi

# Function to download videos from a text file
download_from_text() {
    local URLS_FILE=$1
    while IFS= read -r url
    do
        # Skip empty lines
        if [ -z "$url" ]; then
            continue
        fi

        echo "Downloading $url..."
        yt-dlp -o "$DOWNLOAD_DIR/%(title)s.%(ext)s" "$url"
        if [ $? -ne 0 ]; then
            echo "Failed to download $url"
        else
            echo "Successfully downloaded $url"
        fi
    done < "$URLS_FILE"
}

# Function to download videos from a JSON file
download_from_json() {
    local URLS_FILE=$1
    urls=$(jq -r '.urls[]' "$URLS_FILE")
    for url in $urls
    do
        echo "Downloading $url..."
        yt-dlp -o "$DOWNLOAD_DIR/%(title)s.%(ext)s" "$url"
        if [ $? -ne 0 ]; then
            echo "Failed to download $url"
        else
            echo "Successfully downloaded $url"
        fi
    done
}

# Check if URLs file is provided
if [ -z "$1" ] || [ -z "$2" ]
then
    echo "Usage: $0 <file_with_urls> <file_type>"
    echo "file_type: text or json"
    exit 1
fi

# Read URLs from the provided file
URLS_FILE=$1
FILE_TYPE=$2

# Create a directory to store downloaded videos
DOWNLOAD_DIR="downloaded_videos"
mkdir -p $DOWNLOAD_DIR

# Download videos based on the file type
if [ "$FILE_TYPE" == "text" ]; then
    download_from_text "$URLS_FILE"
elif [ "$FILE_TYPE" == "json" ]; then
    download_from_json "$URLS_FILE"
else
    echo "Invalid file type. Please specify 'text' or 'json'."
    exit 1
fi

echo "All videos have been downloaded to $DOWNLOAD_DIR."