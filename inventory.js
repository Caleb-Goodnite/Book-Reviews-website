// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Replace these with your Supabase project credentials
    const SUPABASE_URL = 'https://kwxexqhzpqowqnqneeys.supabase.co';  // Replace with your Supabase URL
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eGV4cWh6cHFvd3FucW5lZXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjQ1NjAsImV4cCI6MjA1NTk0MDU2MH0.WJMIbbiGcXvcq0fErjPKo8RFGot0KXFNov4YgGrUqIM';  // Replace with your Supabase anon key (Took most of it out)

    // Ensure Supabase library is loaded first before creating client
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Function to fetch inventory
    async function fetchInventory() {
        const { data, error } = await supabase
            .from('books') // Replace with your actual table name
            .select('*'); // Or specify particular columns like 'Title', 'Author', 'Genre', 'ISBN'

        console.log('Fetched data:', data);  // Log the data for debugging

        const inventoryList = document.getElementById('inventory-list');
        if (error) {
            console.error("Error fetching inventory:", error);
            inventoryList.innerHTML = 'Error loading inventory.';
        } else {
            inventoryList.innerHTML = ''; // Clear loading message
            if (data.length === 0) {
                inventoryList.innerHTML = '<p>No books found.</p>';
            } else {
                // Display the fetched books
                data.forEach((book) => {
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book-item');

                    const bookTitle = document.createElement('p');
                    bookTitle.classList.add('book-title');
                    bookTitle.textContent = book.Title;  // Use correct casing

                    const bookAuthor = document.createElement('p');
                    bookAuthor.classList.add('book-author');
                    bookAuthor.textContent = `Author: ${book.Author}`;  // Use correct casing

                    const bookGenre = document.createElement('p');
                    bookGenre.classList.add('book-genre');
                    bookGenre.textContent = `Genre: ${book.Genre}`;  // Use correct casing

                    const bookDetails = document.createElement('p');
                    bookDetails.classList.add('book-details');
                    bookDetails.textContent = `ISBN: ${book.ISBN}`;  // Use correct casing

                    bookElement.appendChild(bookTitle);
                    bookElement.appendChild(bookAuthor);
                    bookElement.appendChild(bookGenre);
                    bookElement.appendChild(bookDetails);

                    inventoryList.appendChild(bookElement);
                });
            }
        }
    }

    // Fetch inventory on page load
    fetchInventory();
});
