document.addEventListener('DOMContentLoaded', function() {
    const maxGuesses = 10;
    let guessCount = 1;
    let resultArray = [];
    let answerItem = null; // This will store the randomly selected item to be guessed

    const tierValues = {
        'COMMON': 1,
        'UNCOMMON': 2,
        'RARE': 3,
        'EPIC': 4,
        'MYTHIC': 6,
        'LEGENDARY': 5,
        'VERY_SPECIAL': 8,
        'SPECIAL': 7,
        'UNOBTAINABLE': 9
    };

    const imageDictionary = {
        'CARPET': '171-0.png',
        'LEATHER_HELMET': '298-0.png',
        'LEATHER_BOOTS': '301-0.png',
        'DIAMOND_HOE': '293-0.png',
        'PRISMARINE_CRYSTALS': '410-0.png',
        'COBBLESTONE': '4-0.png',
        'GOLD_HOE': '294-0.png',
        'ARROW': '262-0.png',
        'LEATHER_CHESTPLATE': '299-0.png',
        'CHAINMAIL_CHESTPLATE': '303-0.png',
        'STORAGE_MINECART': '342-0.png',
        'IRON_INGOT': '265-0.png',
        'DIAMOND_CHESTPLATE': '311-0.png',
        'WOOD_SWORD': '268-0.png',
        'GOLD_CHESTPLATE': '315-0.png',
        'DROPPER': '158-0.png',
        'LOG': '17-0.png',
        'DIAMOND_BOOTS': '313-0.png',
        'GOLD_BOOTS': '317-0.png',
        'REDSTONE_TORCH_ON': '76-0.png',
        'SPONGE': '19-0.png',
        'HOPPER': '154-0.png',
        'IRON_BOOTS': '309-0.png',
        'EMERALD': '388-0.png',
        'IRON_AXE': '258-0.png',
        'SADDLE': '329-0.png',
        'COOKED_FISH': '350-0.png',
        'GOLD_PICKAXE': '285-0.png',
        'MINECART': '328-0.png',
        'GOLD_INGOT': '266-0.png',
        'CHAINMAIL_BOOTS': '305-0.png',
        'RED_MUSHROOM': '40-0.png',
        'WOOD': '5-0.png',
        'STRING': '287-0.png',
        'IRON_PICKAXE': '257-0.png',
        'EXPLOSIVE_MINECART': '407-0.png',
        'ARMOR_STAND': '416-0.png',
        'LEAVES': '18-0.png',
        'HOPPER_MINECART': '408-0.png',
        'BOW': '261-0.png',
        'FISHING_ROD': '346-0.png',
        'DIAMOND': '264-0.png',
        'DIAMOND_PICKAXE': '278-0.png',
        'WOOD_SPADE': '269-0.png',
        'DIAMOND_SWORD': '276-0.png',
        'GOLD_SPADE': '284-0.png',
        'RED_ROSE': '38-0.png',
        'WOOD_HOE': '290-0.png',
        'GOLD_SWORD': '283-0.png',
        'FIREWORK': '401-0.png',
        'IRON_CHESTPLATE': '307-0.png',
        'EMPTY_MAP': '395-0.png',
        'IRON_HELMET': '306-0.png',
        'PACKED_ICE': '174-0.png',
        'IRON_SWORD': '267-0.png',
        'MOSSY_COBBLESTONE': '48-0.png',
        'PRISMARINE_SHARD': '409-0.png',
        'WOOD_AXE': '271-0.png',
        'FENCE': '85-0.png',
        'CHAINMAIL_HELMET': '302-0.png',
        'WHEAT': '296-0.png',
        'FEATHER': '288-0.png',
        'DIAMOND_LEGGINGS': '312-0.png',
        'IRON_SPADE': '256-0.png',
        'SHEARS': '359-0.png',
        'WOOL': '35-0.png',
        'COAL_BLOCK': '173-0.png',
        'STONE_SWORD': '272-0.png',
        'SEA_LANTERN': '169-0.png',
        'WOOD_PICKAXE': '270-0.png',
        'IRON_LEGGINGS': '308-0.png',
        'SKULL_ITEM': '397-0.png',
        'GOLD_HELMET': '314-0.png',
        'INK_SACK': '351-0.png',
        'BOOK': '340-0.png',
        'STAINED_GLASS': '95-0.png',
        'COOKIE': '357-0.png',
        'NETHER_STAR': '399-0.png',
        'MELON_BLOCK': '103-0.png',
        'YELLOW_FLOWER': '37-0.png',
        'IRON_BARDING': '417-0.png',
        'WATER_LILY': '111-0.png',
        'LEATHER_LEGGINGS': '300-0.png',
        'BONE': '352-0.png',
        'GOLD_BARDING': '418-0.png',
        'CHAINMAIL_LEGGINGS': '304-0.png',
        'IRON_HOE': '292-0.png',
        'STICK': '280-0.png',
        'GHAST_TEAR': '370-0.png',
        'COOKED_MUTTON': '424-0.png',
        'HAY_BLOCK': '170-0.png',
        'DISPENSER': '23-0.png',
        'GOLD_AXE': '286-0.png',
        'COMPASS': '345-0.png',
        'MUTTON': '423-0.png',
        'POWERED_MINECART': '343-0.png',
        'BLAZE_ROD': '369-0.png',
        'DOUBLE_PLANT': '175-0.png',
        'STONE_PICKAXE': '274-0.png',
        'ENCHANTED_BOOK': '403-0.png',
        'STAINED_CLAY': '159-0.png',
        'GOLD_LEGGINGS': '316-0.png',
        'DIAMOND_SPADE': '277-0.png',
        'DIAMOND_AXE': '279-0.png',
        'RAW_FISH': '349-0.png',
        'STONE_HOE': '291-0.png',
        'DIAMOND_HELMET': '310-0.png',
        'GOLD_BLOCK': '41-0.png'
    };

    fetch('/api/items')
    .then(response => response.json())
    .then(data => {
        const items = data;
        const index = Math.floor(getSeededRandom() * items.length);
        const answerItem = items[index];
        fetchPrice(answerItem.id).then(price => {
            answerItem.price = price;
        });
        console.log("Selected item:", answerItem);

        const guessInput = document.getElementById('guessInput');
        const resultsDiv = document.getElementById('results');

        document.getElementById('guessBtn').addEventListener('click', function() {
            const guessedItem = guessInput.value.trim().toLowerCase();
            let x = items.find(item => item.name.toLowerCase() === guessedItem);
            if (!x) {
                flashInputRed(guessInput);
                return;  // Exit the function to stop processing the guess
            }
            if (guessCount === 1) {
                // Hide the welcome message, example guess, and image
                document.getElementById('welcomeMessage').style.display = 'none';
                document.getElementById('exampleGuess').style.display = 'none';
                document.getElementById('exampleImage').style.display = 'none';
            }
            guessCount++;
            if (guessCount > maxGuesses && guessedItem !== answerItem.name.toLowerCase()) {
                guessCountDisplay.textContent = `Nice Try!`;
                console.log(guessedItem);
                console.log(answerItem.name.toLowerCase);
                displayEndGameMessage();
                return;
            }
            else{
                if (guessCount > maxGuesses){
                    guessCountDisplay.textContent = `You Got It!`;
                }
                else {
                    guessCountDisplay.textContent = `Guess ${guessCount} of ${maxGuesses}`;
                }
            }
            console.log(answerItem);

            guessInput.value = '';

            let item = items.find(item => item.name.toLowerCase() === guessedItem);
            if (item) {
                fetchPrice(item.id).then(price => {
                    item.price = price;
                    displayItemImage(item.material, item, false);
                    if (guessedItem === answerItem.name.toLowerCase()) {
                        const messageDiv = document.createElement('div');
                        messageDiv.textContent = "Congratulations, you guessed it Correctly!"
                        messageDiv.style.textAlign = 'center'; // Center-align the text
                        messageDiv.style.fontWeight = 'bold'; 
                        messageDiv.style.marginBottom = '20px'; // Space between different messages
            
                        const buttonWrapper = document.createElement('div');
                        buttonWrapper.style.display = 'flex';
                        buttonWrapper.style.justifyContent = 'center'; // Center the button horizontally
                        buttonWrapper.style.marginTop = '10px'; // Space above the button
            
                        const copyButton = document.createElement('button');
                        copyButton.textContent = 'Share Your Results!';
                        copyButton.style.padding = '10px 20px';
                        copyButton.style.fontSize = '16px';
                        copyButton.style.fontWeight = 'bold';
                        copyButton.style.color = 'white';
                        copyButton.style.backgroundColor = '#007bff'; // Blue color, change as needed
                        copyButton.style.border = 'none';
                        copyButton.style.borderRadius = '5px';
                        copyButton.style.cursor = 'pointer';
                        copyButton.addEventListener('click', () => {
                            navigator.clipboard.writeText(generateMessage(resultArray));
                        });
                        buttonWrapper.appendChild(copyButton);
            
                        messageDiv.appendChild(buttonWrapper); // Add the button wrapper to the message div
                        resultsDiv.innerHTML = ''; // Clear the results div
                        resultsDiv.appendChild(messageDiv); // Add the message div with the copy button
                        displayItemImage(answerItem.material, item, false);
                        console.log(resultArray);
                        return;
                    }
                });
            } else {
                resultsDiv.insertAdjacentHTML('afterbegin', `<p>Incorrect, try again! You have ${maxGuesses - guessCount} guesses left.</p>`);
            }
        });

        function displayItemImage(material, item, isFinal) {
            const resultsDiv = document.getElementById('results');
            const guessContainer = document.createElement('div');
            guessContainer.style.marginBottom = '20px'; // Space between different guesses
            guessContainer.style.display = 'flex'; // Set the display to flex to enable flexbox properties
            guessContainer.style.flexDirection = 'column'; // Stack the flex items vertically
            guessContainer.style.alignItems = 'center'; // Center-align items horizontally
            
            // Create a flex container
            const flexContainer = document.createElement('div');
            flexContainer.style.display = 'flex'; // Set display to flex to align items in a row
            flexContainer.style.alignItems = 'center'; // Center items vertically
            flexContainer.style.marginBottom = '10px'; // Add some margin below the container

            let imagePath, imageAlt;

            if (material === 'SKULL_ITEM' && item && item.skin) {
                try {
                    let skinDataBase64 = item.skin.replace("\u003d", "=");
                    let decodedJsonString = atob(skinDataBase64);
                    let skinData = JSON.parse(decodedJsonString);
                    let skinUrl = skinData.textures.SKIN.url;
                    let skinHash = skinUrl.substring(skinUrl.lastIndexOf('/') + 1);
                    imagePath = `https://mc-heads.net/head/${skinHash}`;
                    imageAlt = "Image of Skull Item";
                } catch (error) {
                    console.error('Failed to display skull item image:', error);
                    resultsDiv.insertAdjacentHTML('afterbegin', "<p>Error displaying skull item image.</p>");
                    return;
                }
            } else {
                // Fetch the image name from the dictionary and construct the image path for non-skull items
                const imageName = imageDictionary[material.toUpperCase()];
                imagePath = `./items/${imageName}`;
                imageAlt = `Image of ${material}`;
            }
            // Create an img element and set its properties
            const imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = imageAlt;
            imageElement.style.width = '100px'; // Example width, adjust as needed
            imageElement.style.height = '100px'; // Example height, adjust as needed
            imageElement.style.marginRight = '10px'; // Add margin to the right of the image

            flexContainer.appendChild(imageElement);

            const textElement = document.createElement('div');
            textElement.textContent = item.name; // Set text content to item's name
            textElement.style.fontSize = '35px'; // Set font size, adjust as needed
            textElement.style.fontWeight = 'bold';


            flexContainer.appendChild(textElement);
            guessContainer.appendChild(flexContainer);
        
            const attributes = [
                {label: 'Category', value: item.category},
                {label: 'Material', value: material},
                {label: 'Rarity', value: `${item.tier} ${compareTierBG(item.tier, answerItem.tier)}`},
                {label: 'Price', value: `$${formatPrice(item.price)} ${
                    Math.abs(item.price - answerItem.price) <= 0.01 * answerItem.price ? '' : 
                    item.price > answerItem.price ? '↓' : '↑'
                }`}
            ];
            console.log(answerItem.price);
            console.log(item.price);
                
            let guessArray = [0,0,0,0];
            attributes.forEach((attr, index) => {
                const cardDiv = document.createElement('div');
                cardDiv.style.marginLeft = '22px'
                // Assign class based on index; larger cards for first two items
                cardDiv.className = (index < 2) ? 'card large-card' : 'card small-card';
                // Add flipping and flipped classes to the card divs

                if ((attr.label === 'Rarity' || attr.label === 'Price') && 
                    !attr.value.includes('↓') && !attr.value.includes('↑')) {
                    setTimeout(() => {
                        cardDiv.classList.add('correct');
                    }, 750);
                    if (attr.label === 'Rarity') {
                        guessArray[2] = 1;
                    }
                    else {
                        guessArray[3] = 1;
                    }
                    
                }

                if (attr.label === 'Price' && Math.abs(item.price - answerItem.price) <= 25000000  && 
                (attr.value.includes('↓') || attr.value.includes('↑'))) {
                    setTimeout(() => {
                        cardDiv.classList.add('close');
                    }, 750);
                    guessArray[3] = 2;
                }

        
                // Set the background color to green if the value matches the answer's value
                if (attr.value === answerItem[attr.label.toLowerCase()]) {
                    setTimeout(() => {
                        cardDiv.classList.add('correct');
                    }, 750);
                    if (attr.label === 'Category') {
                        guessArray[0] = 1;
                    }
                    else if (attr.label === 'Material'){
                        guessArray[1] = 1;
                    }
                    else if (attr.label === 'Rarity'){
                        guessArray[2] = 1;
                    }
                    else {
                        guessArray[3] = 1;
                    }
                }
        
                const cardHeader = document.createElement('div');
                cardHeader.className = 'card-header';
                cardHeader.textContent = attr.label; // Header text

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTextContainer = document.createElement('div');
                cardTextContainer.className = 'card-text-container'; // New container for the text content

                const cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = attr.value; // Body text

                cardTextContainer.appendChild(cardText); // Append text to the container
                cardBody.appendChild(cardTextContainer); // Append container to the body

                cardDiv.appendChild(cardHeader);
                cardDiv.appendChild(cardBody);
                guessContainer.appendChild(cardDiv); // Insert each new attribute card at the top of the resultsDiv
            });
            resultArray.push(guessArray);
            if (isFinal) {
                // Create a message element for the final message
                const finalMessageElement = document.createElement('p');
                finalMessageElement.textContent = 'No more guesses left. The Correct answer was:';
                finalMessageElement.style.textAlign = 'center'; // Center-align the text
                finalMessageElement.style.fontWeight = 'bold'; // Make the text bold

                // Insert the final message before the guessContainer
                resultsDiv.insertBefore(finalMessageElement, resultsDiv.firstChild); // Insert just after the final message
                resultsDiv.insertBefore(guessContainer, finalMessageElement.nextSibling);
            } else {
                resultsDiv.insertBefore(guessContainer, resultsDiv.firstChild);
            }
        }

        function mulberry32(seed) {
            return function() {
                var t = seed += 0x6D2B79F5;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            }
        }
        
        function getSeededRandom() {
            const date = new Date();
            const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            const seed = estDate.getFullYear() * 10000 + (estDate.getMonth() + 1) * 100 + estDate.getDate();
            const randomFunc = mulberry32(seed);
            return randomFunc();
        }
                                                                      

        function displayEndGameMessage() {
            const resultsDiv = document.getElementById('results');
        
            // Create a message element
            const messageElement = document.createElement('p');
            messageElement.textContent = 'No more guesses left. The correct answer was:';
        
            // Insert the message element at the top of the resultsDiv
            resultsDiv.appendChild(messageElement);
        
            // Then display the image corresponding to the answer
            const messageDiv = document.createElement('div');
            messageDiv.textContent = ""
            messageDiv.style.textAlign = 'center'; // Center-align the text
            messageDiv.style.fontWeight = 'bold'; 
            messageDiv.style.marginBottom = '20px'; // Space between different messages

            const buttonWrapper = document.createElement('div');
            buttonWrapper.style.display = 'flex';
            buttonWrapper.style.justifyContent = 'center'; // Center the button horizontally
            buttonWrapper.style.marginTop = '10px'; // Space above the button

            const copyButton = document.createElement('button');
            copyButton.textContent = 'Share Your Results!';
            copyButton.style.padding = '10px 20px';
            copyButton.style.fontSize = '16px';
            copyButton.style.fontWeight = 'bold';
            copyButton.style.color = 'white';
            copyButton.style.backgroundColor = '#007bff'; // Blue color, change as needed
            copyButton.style.border = 'none';
            copyButton.style.borderRadius = '5px';
            copyButton.style.cursor = 'pointer';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(generateMessage(resultArray));
            });
            buttonWrapper.appendChild(copyButton);

            messageDiv.appendChild(buttonWrapper); // Add the button wrapper to the message div
            resultsDiv.innerHTML = ''; // Clear the results div
            resultsDiv.appendChild(messageDiv); // Add the message div with the copy button
            displayItemImage(answerItem.material, answerItem, true); // Pass a new parameter if needed
            console.log(resultArray);
        }

        function flashInputRed(inputElement) {
            inputElement.style.transition = 'background-color 0.3s ease';
            inputElement.style.backgroundColor = '#eb4949'; // Set background color to red to indicate error
            setTimeout(() => {
                inputElement.style.backgroundColor = ''; // Reset background color after 500ms
            }, 500);
        }

        function generateMessage(grid) {
            // Map the numbers in the grid to emojis
            grid.pop();
            const emojis = grid.map(row => row.map(cell => {
                switch (cell) {
                    case 0:
                        return '⬛'; // Black square
                    case 1:
                        return '🟩'; // Green square
                    case 2:
                        return '🟨'; // Yellow square
                    default:
                        return '';
                }
            }));
        
            // Join the emojis to form rows and then join rows with line breaks
            const gridString = emojis.map(row => row.join('')).join('\n');
            let message;
        
            // Construct the final message
            if (guessCount > 10 && resultArray[resultArray.length - 1].every(val => val === 1)) {
                message = `Skydle ${10}/10\n\n${gridString}`;
            } else if (guessCount > 10 && !resultArray[resultArray.length - 1].every(val => val === 1)) {
                message = `Skydle x/10\n\n${gridString}`;
            } else {
                message = `Skydle ${guessCount-1}/10\n\n${gridString}`;
            }
            return message;
        }
        

        function compareTierBG(guessedTier, answerTier) {
            const guessedValue = tierValues[guessedTier];
            const answerValue = tierValues[answerTier];
            console.log(answerValue)
            console.log(guessedValue)
            if (guessedValue === undefined || answerValue === undefined) {
                return 'Tier comparison error';
            }
            if (guessedValue > answerValue) {
                return '↓';
            } else if (guessedValue < answerValue) {
                return '↑';
            }
            else {
                return '';
            }
        }

        function formatPrice(price) {
            // Check if the input is a valid number
            if (typeof price !== 'number' || isNaN(price)) {
                return "Invalid price";  // Return an error message for invalid input
            }
        
            // Convert and format price based on its size
            if (price >= 1e9) {
                return Math.round(price / 1e9) + 'b';  // Billions
            } else if (price >= 1e6) {
                return Math.round(price / 1e6) + 'm';  // Millions
            } else if (price >= 1e3) {
                return Math.round(price / 1e3) + 'k';  // Thousands
            } else {
                return price.toString();  // Prices less than 1000
            }
        }        
        

        function fetchPrice(itemId) {
            return fetch(`https://sky.coflnet.com/api/item/price/${itemId}/current?count=1`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => {
                    if (json && json.buy !== undefined) {
                        return json.buy;
                    } else {
                        return 0;
                    }
                })
                .catch(error => {
                    console.error('Error fetching price:', error);
                    return "Error fetching price";
                });
        }

        // Autocomplete functionality
        guessInput.addEventListener('input', function() {
            handleAutocomplete(this.value, items);
        });

        function handleAutocomplete(inputText, items) {
            clearAutocomplete();
            if (!inputText) return;

            const suggestions = items.filter(item => item.name.toLowerCase().startsWith(inputText.toLowerCase()));
            displayAutocomplete(suggestions);
        }

        function displayAutocomplete(suggestions) {
            const autocompleteDiv = document.createElement('div');
            autocompleteDiv.setAttribute('id', 'autocomplete-list');
            autocompleteDiv.setAttribute('class', 'autocomplete-items');
            guessInput.parentNode.appendChild(autocompleteDiv);

            suggestions.forEach(item => {
                let itemDiv = document.createElement('div');
                itemDiv.textContent = item.name;
                itemDiv.addEventListener('click', function() {
                    guessInput.value = item.name;
                    clearAutocomplete();
                });
                autocompleteDiv.appendChild(itemDiv);
            });
        }

        function clearAutocomplete() {
            let autocompleteItems = document.getElementById('autocomplete-list');
            if (autocompleteItems) {
                autocompleteItems.parentNode.removeChild(autocompleteItems);
            }
        }
    })
    .catch(error => console.error('Error loading items:', error));
});
