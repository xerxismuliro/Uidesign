
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('video-title');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('#playlist li');
    
    let currentVideoIndex = 0;
    
    // Initialize with the first video
    loadVideo(currentVideoIndex);
    
    // Play button functionality
    playBtn.addEventListener('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playBtn.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playBtn.textContent = 'Play';
        }
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex - 1 + playlistItems.length) % playlistItems.length;
        loadVideo(currentVideoIndex);
    });
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex + 1) % playlistItems.length;
        loadVideo(currentVideoIndex);
    });
    
    // Playlist item click functionality
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentVideoIndex = index;
            loadVideo(currentVideoIndex);
        });
    });
    
    // When video ends, play the next one
    videoPlayer.addEventListener('ended', function() {
        currentVideoIndex = (currentVideoIndex + 1) % playlistItems.length;
        loadVideo(currentVideoIndex);
    });
    
    // Update play/pause button based on video state
    videoPlayer.addEventListener('play', function() {
        playBtn.textContent = 'Pause';
    });
    
    videoPlayer.addEventListener('pause', function() {
        playBtn.textContent = 'Play';
    });
    
    // Function to load a video
    function loadVideo(index) {
        const selectedItem = playlistItems[index];
        const videoSrc = selectedItem.getAttribute('data-src');
        
        // Update video source
        videoPlayer.src = videoSrc;
        
        // Update video title
        videoTitle.textContent = selectedItem.textContent;
        
        // Update active playlist item
        playlistItems.forEach(item => item.classList.remove('active'));
        selectedItem.classList.add('active');
        
        // Play the video
        videoPlayer.play();
    }
});