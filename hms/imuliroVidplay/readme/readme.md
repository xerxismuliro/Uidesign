# How to use Git Large File.

# For Mac (using Homebrew)
brew install git-lfs




# Navigate to your repository
cd ~/Spring2025/SpringClasses/UIdesign/Uisoftwares
# Initialize Git LFS
git lfs install
# Track video files with Git LFS
git lfs track "*.mp4"
# Make sure the .gitattributes file is committed
git add .gitattributes
git commit -m "Configure Git LFS for video files"



# Remove the existing video from Git tracking (but keep the file)
git rm --cached hms/imuliroVidplay/vids/imulirosamplevid.mp4
# Add it back with LFS
git add hms/imuliroVidplay/vids/imulirosamplevid.mp4
git commit -m "Move video to Git LFS"
git push


# Just add them normally
git add path/to/new/video.mp4
git commit -m "Add new video"
git push
