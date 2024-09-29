# TooDoo

TooDoo is a simple and efficient task management web application that allows users to create, edit, delete, and manage their tasks. It features a user-friendly interface with dark mode support.

## Features

- **Add Tasks**: Easily add new tasks to your to-do list.
- **Edit Tasks**: Modify existing tasks directly in the list.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Checkbox Functionality**: Mark tasks as complete or incomplete.
- **Dark Mode**: Toggle between light and dark themes for a better user experience.

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling the UI with responsive design.
- **JavaScript**: Core functionality, including task management and theme toggling.
- **SVG**: Used for icons and branding.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/byVusi/toodoo.git

2. Open ```index.html``` in your preferred web browser.

## Usage

- **Adding Tasks**: Type a task in the input field and click the "Add" button.
- **Editing Tasks**: Click the pencil icon next to a task to edit it.
- **Deleting Tasks**: Click the trash icon to remove a task.
- **Marking Tasks**: Use the checkbox to mark tasks as complete or incomplete.
- **Toggling Dark Mode**: Click the toggle switch to switch between light and dark themes.

## File Structure

```.
├── index.html            # Main HTML file
├── CSS
│   └── color.css         # Styles for the application
├── images
│   └── brand-log.svg     # Logo and icons
├── modules
│   ├── ListItem.js       # Class for list item representation
│   ├── listItemControls.js # Controls for editing, deleting, and checking items
│   ├── render.js         # Functions to render the task list
│   ├── storage.js        # Functions for local storage management
│   ├── toggleDarkMode.js # Functionality to toggle dark mode
│   └── formButtonClick.js # Handles adding tasks from the form
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the ```MIT License```. See the LICENSE file for details.

Feel free to adjust any sections as needed. Let me know if there's anything else I can help with!
