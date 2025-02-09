document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('category-container');
    const addCategoryBtn = document.querySelector('.add-category');

    addCategoryBtn.addEventListener('click', function() {
        // Create a wrapper div to hold both dropdown and remove button
        const categoryWrapper = document.createElement('div');
        categoryWrapper.classList.add('category-wrapper');

        // Create new dropdown
        const newDropdown = document.createElement('select');
        newDropdown.classList.add('category-dropdown');
        newDropdown.innerHTML = `
            <option value="" disabled selected>Choose a Category</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Living</option>
            <option>Beauty & Health</option>
            <option>Bicycle</option>
            <option>Kids</option>
            <option>Games & Toys</option>
            <option>Learning</option>
            <option>School Supplies</option>
            <option>Cars</option>
            <option>Accessories</option>
            <option>Other</option>
        `;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-category');
        removeBtn.textContent = '−'; // Minus sign
        removeBtn.addEventListener('click', function() {
            categoryWrapper.remove(); // Remove the dropdown and button when clicked
        });

        // Append dropdown and remove button to wrapper
        categoryWrapper.appendChild(newDropdown);
        categoryWrapper.appendChild(removeBtn);

        // Append wrapper to category container
        categoryContainer.appendChild(categoryWrapper);
    });
});
