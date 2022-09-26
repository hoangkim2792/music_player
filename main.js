
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const songThumb = $('.player_img img')
const songName = $('.song_name')
const songAuthor = $('.song_author')
const songThumbPlist = $('.currsongif-img img')
const songNamePList = $('.currsongif-name')
const songAuthorPList = $('.currsongif-author')
const playPausewrapper = $('.play_pause')
const playPauseBtn = $('.play_pause span')
const audio = $('#audio')
const progressWrapper = $('.progress_area')
const progressBar = $('.progress-bar')
const playListWrapper = $('.playlist');
const mainPlayList = $('.main_playlist')
const currentElement = $('.current')
const durationElement = $('.duration')
const prevBtn = $('#prev')
const nextBtn = $('#next')
const repeatLoopBtn = $('#repeat-loop')
const musicListBtn = $('#music_list')
const closeMusicList = $('#close')
const musicListItem = $('.main_playlist')
const musicListPlayBtn = $('.currsongif-info-playpause-btn')
const musicListPrevBtn = $('.currsongif-info-prev-btn')
const musicListNextBtn = $('.currsongif-info-next-btn')
const quantytiSongAlbum = $('.currsongif-album')
const waves = $('.playlist-item-index')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [

        {   
            name: 'Thêm bao lâu',
            singer:'Đạt G',
            path:'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/ebb189aeb0e959b700f8/7841055188187012774?authen=exp=1664384498~acl=/ebb189aeb0e959b700f8/*~hmac=2b38b3dfda3c4b47a775a0b20c645553',
            image: './assets/img/thembaolau.jpeg',
        },
        {   
            name: 'Đừng chờ anh nữa',
            singer:'Tăng Phúc',
            path:'https://vnso-zn-16-tf-mp3-s1-m-zmp3.zmdcdn.me/8e27cdf416b0ffeea6a1/4282103162349389003?authen=exp=1664384410~acl=/8e27cdf416b0ffeea6a1/*~hmac=3b17661c76911bb857bab541ab51f401',
            image: './assets/img/dungchoanhnua.jpeg',
        },
        {   
            name: 'Đúng người đúng thời điểm',
            singer:'Thanh Hưng',
            path:'https://vnso-zn-24-tf-mp3-s1-m-zmp3.zmdcdn.me/14033a2d036aea34b37b/3492656630613786320?authen=exp=1664384888~acl=/14033a2d036aea34b37b/*~hmac=1cd4a275991663aecb97d9cfd34304c9',
            image: './assets/img/dungnguoidungthoidiem.jpeg',
        },
        {   
            name: 'Bánh mì không',
            singer:'Đạt G',
            path:'https://vnso-zn-5-tf-mp3-s1-m-zmp3.zmdcdn.me/520737eb16acfff2a6bd/6972486596562639576?authen=exp=1664384887~acl=/520737eb16acfff2a6bd/*~hmac=8f1ee21aa83a064d60788ce6b7eaa8a0',
            image: './assets/img/banhmikhong.jpeg',
        },
        {
            name: 'Đường Tôi Trở em Về',
            singer:'Lofi ver',
            path:'./assets/music/duongtoitroemve.mp3',
            image: './assets/img/duongtoitroemve.jpg',
        },
        {
            name: 'Duyên Duyên Số Số',
            singer:'Du Uyen x Nguyen Thuong',
            path:'./assets/music/duyenduyensoso.mp3',
            image: './assets/img/duyenduyensoso.jpg',
        },
        {
            name: 'Kiss',
            singer:'Hung Kubo Remix',
            path:'./assets/music/kiss.mp3',
            image: './assets/img/kiss.jpg',
        },
        {
            name: 'Kẻ Điên Tin Vào Tình Yêu',
            singer:'Lil Zpoet, Fread D',
            path:'./assets/music/kedientinvaotinhyeu.mp3',
            image: './assets/img/kedientinvaotinhyeu.jpg',
        },
        {
            name: 'Chẳng Thể Tìm Được Em',
            singer:'PhucXp ft. Freak D',
            path:'./assets/music/changthetimduocem.mp3',
            image: './assets/img/changthetimduocem.jpg',
        },
        {
            name: 'Về bên anh',
            singer:'Jack',
            path:'./assets/music/vebenanh.mp3',
            image: './assets/img/vebenanh.jpg',
        },
    ],

    handleEvents: function() {
        const _this = this;
       
        // play , pause audio
        playPausewrapper.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
               
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            _this.isPlaying = true;
            playPauseBtn.innerText = 'pause'
            musicListPlayBtn.innerText = 'pause_circle'
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            playPauseBtn.innerText = 'play_arrow'
            musicListPlayBtn.innerText = 'play_circle'
        }


        musicListPlayBtn.onclick = function() {
            playPausewrapper.click()
        }

        // xu ly thanh progress bar khi audio chay

        audio.ontimeupdate = function() {
            const songCurrentTime = this.currentTime;
            const songDurationTime = this.duration;
            const progressWid = (songCurrentTime / songDurationTime) * 100;
            progressBar.style.width = progressWid + '%';



            let currentMin = Math.floor(songCurrentTime / 60)
            let currentSec = Math.floor(songCurrentTime % 60)
            if(currentSec < 10) {
                currentSec = '0'+ currentSec;
            }
            currentElement.innerText = `${currentMin}:${currentSec}`;

            
        }
        // xu ly tua
        progressWrapper.onclick = function(e) {
            const progressWidVal = this.offsetWidth;
            const progressBarOffetsX = e.offsetX;
            const songDuration = audio.duration;
            audio.currentTime = (progressBarOffetsX / progressWidVal) * songDuration;
        }

        // xu ly thoi gian bai hat
        audio.onloadeddata = function() {
            const songCurrentTime = this.currentTime;
            const songDurationTime = this.duration;
            let durationMin = Math.floor(songDurationTime / 60)
            let durationSec = Math.floor(songDurationTime % 60)
            if(durationSec < 10) {
                durationSec = '0'+ durationSec;
            }
            durationElement.innerText = `${durationMin}:${durationSec}`;
        }

        // next bai hat
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong();
            }
            audio.play()

        }
        musicListNextBtn.onclick = function() {
            nextBtn.click();
        }

        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else{
                _this.prevSong();
            }
            audio.play()

        }
        musicListPrevBtn.onclick = function() {
            prevBtn.click();
        }

        // lap bai hat
        repeatLoopBtn.onclick = function() {
            let repeatText = this.innerText;
            
            switch(repeatText) {
                case 'repeat':
                    this.innerText = 'repeat_one';
                    break;
                case 'repeat_one':
                    this.innerText = 'shuffle';
                    break;
                case 'shuffle':
                    this.innerText = 'repeat';
                    break;
            }
        }

        audio.onended = function() {
            let repeatText = repeatLoopBtn.innerText;
            switch(repeatText) {
                case 'repeat':
                    nextBtn.click();
                    break;
                case 'repeat_one':
                    this.currentTime = 0;
                    this.play()
                    break;
                case 'shuffle':
                    _this.isRandom = true;
                    _this.randomSong();
                    audio.play()
                    break;
            }

            
        }


        // show music list
        musicListBtn.onclick = function() {
            playListWrapper.classList.add('show')
        }

        closeMusicList.onclick = function() {
            playListWrapper.classList.remove('show')

        }

        musicListItem.onclick = function(e) {
            const songNode = e.target.closest('.main_playlist-item:not(.active)');
            if(songNode || e.target.closest('#option')) {
                if(songNode) {
                    let dataIndex = songNode.getAttribute('data-index');
                    _this.currentIndex = Number(dataIndex);
                    _this.loadCurrentSong()
                    _this.renderToPlayList()
                    audio.play();
                }
                if(e.target.closest('#option')) {

                }
            }
        }

       

    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex == this.currentIndex)
        this.currentIndex = newIndex;
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    loadCurrentSong: function() {
        // Load the current song to player
        quantytiSongAlbum.innerText = `Album ${this.songs.length} song 2022`
        songThumb.src = this.currentSong.image;
        songName.innerHTML = this.currentSong.name;
        songAuthor.innerHTML = this.currentSong.singer;

        //load the currentSong to play list
        songThumbPlist.src = this.currentSong.image;
        songNamePList.innerHTML = this.currentSong.name;
        songAuthorPList.innerHTML = this.currentSong.singer;

        audio.src = this.currentSong.path;
    },

    defindProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    
    renderToPlayList: function() {
        let htmlPlayList = this.songs.map(function(song, index) {
            return `
            <div class="main_playlist-item ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <span class="playlist-item-index">${index+1}</span>
                <div class="playlist-itemif">
                    <p class="playlist-item-name">${song.name}</p>
                    <p class="playlist-item-author">${song.singer}</p>
                </div>
                <span id="option" class="waves_container ${index === app.currentIndex  ? 'show_wave' : ''}">
                    <span class="music_waves wave1"></span>
                    <span class="music_waves wave2"></span>
                    <span class="music_waves wave3"></span>
                    <span class="music_waves wave4"></span>
                </span>
            </div>
            `
        })
        mainPlayList.innerHTML = htmlPlayList.join('\n')
    },

    start: function() {
        this.defindProperties();

        //render bai hat ra giao dien
        this.renderToPlayList()

        this.loadCurrentSong()
        
        this.handleEvents()

    }
    
}
app.start();
