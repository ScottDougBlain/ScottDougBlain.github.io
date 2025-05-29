// Apophenia Demo - Multi-Song Pattern Recognition
console.log('Apophenia demo script loading...');

document.addEventListener('DOMContentLoaded', function() {
    // Song data with lyrics and interpretations
    const songs = [
        {
            id: 'swift',
            artist: '(Taylor Swift style)',
            lyrics: {
                verse1: `We were golden hour dreams on a Tuesday night
Dancing in the kitchen till the morning light
You said forever but you meant goodbye
Now I'm learning how to fall before I fly`,
                
                chorus: `Yeah, I'm learning how to fall before I fly
At twenty-two with these broken wings
All those promises you made at 2 AM
Like castle walls of paper-mache`,
                
                bridge: `I was twenty-two and brave
Thought your love was mine to save
But some things you can't fix
With a kiss at 2 AM
So I'll take these broken wings
And teach myself to fly again`
            },
            interpretations: {
                0: "Just another generic pop song. These lyrics could apply to anyone.",
                25: "A bittersweet song about lost love. The imagery of dancing and golden hour creates a nostalgic mood.",
                50: "This resonates with me. I remember dancing in my kitchen with my ex. The metaphor about learning to fly speaks to personal growth after heartbreak.",
                75: "Wait... I was exactly 22 when this happened. We always met on Tuesdays. And that fight at 2 AM... this is getting eerily specific to my life.",
                90: "She's singing about MY relationship. The paper-mache castle - that's the apartment we shared on Castle Street. How does she know these details?",
                100: "This is a message meant for me. 'Fall before I fly' - the universe is telling me I must experience this earthly suffering before ascending. The number 22 represents the divine duality. Tuesday = 'twos-day' = another sign of duality. This song was written to guide my spiritual awakening."
            },
            highlightWords: {
                25: ['golden hour', 'dancing', 'forever', 'goodbye'],
                50: ['Tuesday night', 'kitchen', 'fall before I fly'],
                75: ['twenty-two', '2 AM', 'broken wings'],
                90: ['promises', 'castle walls', 'paper-mache', 'save'],
                100: 'all'
            }
        },
        {
            id: 'dylan',
            artist: '(Bob Dylan style)',
            lyrics: {
                verse1: `The clock strikes twelve on Babylon Street
Where prophets sell tomorrow for a dime
Your shadow's dancing with concrete feet
While angels count in seven-four time`,
                
                chorus: `Don't need a weatherman to see the rain
Don't need a doctor for this kind of pain
The signs are written in the subway walls
Paradise lost in shopping malls`,
                
                bridge: `Neon signs flicker like dying prayers
In the cathedral of despair
While businessmen count silver coins
And mothers weep for wayward sons`
            },
            interpretations: {
                0: "Typical pretentious folk rock. Meaningless word salad.",
                25: "Social commentary about modern life and lost innocence. The imagery critiques commercialism.",
                50: "The Babylon Street reference speaks to me - I live near a Babylon Road. The seven-four time signature... that's oddly specific.",
                75: "Clock strikes twelve - that's when my insomnia peaks. 'Prophets sell tomorrow' - my fortune teller appointment is tomorrow. This can't be coincidence.",
                90: "The subway walls - I saw graffiti yesterday that said 'Paradise.' Shopping malls - I work at the mall. He's describing my exact life path.",
                100: "This is prophetic. Babylon = the matrix we live in. Seven-four time = 7/4 = 1.75 = the golden ratio approximation. The angels are interdimensional beings trying to communicate through Dylan. I must find these subway walls."
            },
            highlightWords: {
                25: ['Babylon Street', 'prophets', 'rain', 'pain'],
                50: ['clock strikes twelve', 'shadow', 'seven-four time'],
                75: ['weatherman', 'doctor', 'subway walls'],
                90: ['angels', 'signs', 'Paradise lost', 'shopping malls'],
                100: 'all'
            }
        },
        {
            id: 'radiohead',
            artist: '(Radiohead style)',
            lyrics: {
                verse1: `Fluorescent lights flicker like dying stars
In supermarket aisles of broken dreams
Plastic faces melting in glass jars
Nothing here is what it seems`,
                
                chorus: `We're just ones and zeros in the stream
Digital ghosts in the machine
Press delete, start again
Everything in its right place, amen`,
                
                bridge: `Static voices through the radio
Telling us which way to go
But the signal's getting weak
And we're running out of time to speak`
            },
            interpretations: {
                0: "Another depressing Radiohead song. They all sound the same.",
                25: "Commentary on digital alienation and consumer culture. The imagery evokes technological dystopia.",
                50: "The fluorescent lights... like my office. 'Digital ghosts' perfectly captures how I feel at work. This speaks to my experience.",
                75: "Supermarket aisles - I was just at the store. 'Ones and zeros' - I'm a programmer. 'Press delete' - I almost deleted my project yesterday. Too specific.",
                90: "They're watching me through the fluorescent lights. 'Plastic faces' - everyone around me is fake, NPCs. 'Everything in its right place' - a command to organize my life according to their plan.",
                100: "This is a transmission from the simulation architects. We ARE ones and zeros. 'Press delete, start again' is telling me to reset my consciousness. The dying stars are collapsing timelines. I must break free from the machine."
            },
            highlightWords: {
                25: ['fluorescent lights', 'dying stars', 'broken dreams'],
                50: ['supermarket aisles', 'ones and zeros', 'digital ghosts'],
                75: ['plastic faces', 'glass jars', 'machine'],
                90: ['nothing', 'what it seems', 'delete', 'start again'],
                100: 'all'
            }
        }
    ];
    
    // Current state
    let currentSongIndex = 0;
    let currentSliderValue = 0;
    
    // DOM elements
    const artistStyle = document.getElementById('artist-style');
    const lyricsContent = document.getElementById('lyrics-content');
    const interpretationContent = document.getElementById('interpretation-content');
    const patternSlider = document.getElementById('pattern-slider');
    const newSongBtn = document.getElementById('new-song-btn');
    
    // Check if elements exist
    if (!lyricsContent || !interpretationContent || !patternSlider) {
        console.log('Apophenia demo elements not found on this page');
        return;
    }
    
    console.log('Apophenia demo elements found, initializing...');
    
    // Initialize demo
    function initDemo() {
        loadSong(songs[currentSongIndex]);
        updateInterpretation(0);
        updateHighlights(0);
    }
    
    // Load a song's lyrics
    function loadSong(song) {
        artistStyle.textContent = song.artist;
        
        let lyricsHTML = '';
        Object.entries(song.lyrics).forEach(([section, text]) => {
            lyricsHTML += `<div class="${section}">${processLyricsForHighlighting(text)}</div>`;
        });
        
        lyricsContent.innerHTML = lyricsHTML;
    }
    
    // Process lyrics to add spans for highlighting
    function processLyricsForHighlighting(text) {
        // Split by lines and words, wrap each word in a span
        return text.split('\\n').map(line => {
            return line.split(' ').map(word => {
                // Clean word for matching (remove punctuation for data attribute)
                const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
                return `<span class="word" data-word="${cleanWord}">${word}</span>`;
            }).join(' ');
        }).join('<br>');
    }
    
    // Update interpretation based on slider value
    function updateInterpretation(value) {
        const song = songs[currentSongIndex];
        let interpretation = "";
        let className = "";
        
        if (value <= 10) {
            interpretation = song.interpretations[0];
            className = "skeptical";
        } else if (value <= 35) {
            interpretation = song.interpretations[25];
            className = "moderate";
        } else if (value <= 60) {
            interpretation = song.interpretations[50];
            className = "personal";
        } else if (value <= 80) {
            interpretation = song.interpretations[75];
            className = "uncanny";
        } else if (value <= 95) {
            interpretation = song.interpretations[90];
            className = "uncanny";
        } else {
            interpretation = song.interpretations[100];
            className = "extreme";
        }
        
        interpretationContent.textContent = interpretation;
        interpretationContent.className = `interpretation-content ${className}`;
    }
    
    // Update highlights based on slider value
    function updateHighlights(value) {
        const song = songs[currentSongIndex];
        const words = lyricsContent.querySelectorAll('.word');
        
        // Remove all existing highlights
        words.forEach(word => {
            word.classList.remove('highlight', 'new');
        });
        
        // Determine which words to highlight
        let wordsToHighlight = [];
        
        if (value > 10) {
            if (value <= 35) {
                wordsToHighlight = song.highlightWords[25] || [];
            } else if (value <= 60) {
                wordsToHighlight = [...(song.highlightWords[25] || []), ...(song.highlightWords[50] || [])];
            } else if (value <= 80) {
                wordsToHighlight = [...(song.highlightWords[25] || []), ...(song.highlightWords[50] || []), ...(song.highlightWords[75] || [])];
            } else if (value <= 95) {
                wordsToHighlight = [...(song.highlightWords[25] || []), ...(song.highlightWords[50] || []), ...(song.highlightWords[75] || []), ...(song.highlightWords[90] || [])];
            } else {
                // Highlight everything at 100
                words.forEach(word => {
                    word.classList.add('highlight');
                });
                return;
            }
        }
        
        // Apply highlights with animation
        words.forEach(word => {
            const wordData = word.getAttribute('data-word');
            const wordText = word.textContent.toLowerCase().replace(/[.,!?;:]/g, '');
            
            // Check if this word should be highlighted
            const shouldHighlight = wordsToHighlight.some(highlightWord => {
                return wordText.includes(highlightWord.toLowerCase()) || 
                       wordData.includes(highlightWord.toLowerCase()) ||
                       highlightWord.toLowerCase().includes(wordText);
            });
            
            if (shouldHighlight) {
                // Add animation class for new highlights
                if (!word.classList.contains('highlight')) {
                    word.classList.add('new');
                    setTimeout(() => word.classList.remove('new'), 600);
                }
                word.classList.add('highlight');
            }
        });
    }
    
    // Event listeners
    patternSlider.addEventListener('input', function() {
        currentSliderValue = parseInt(this.value);
        updateInterpretation(currentSliderValue);
        updateHighlights(currentSliderValue);
    });
    
    newSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        updateInterpretation(currentSliderValue);
        updateHighlights(currentSliderValue);
    });
    
    // Initialize the demo
    initDemo();
    
    console.log('Apophenia demo initialized successfully!');
});