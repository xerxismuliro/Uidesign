TODO_FILE="ToDoList.txt"

# Function to display the menu
show_menu() {
    printf "\033[1;34m1. Add a to-do item\033[0m\n"
    printf "\033[1;34m2. View to-do list\033[0m\n"
    printf "\033[1;34m3. Exit\033[0m\n"
}

# Function to add a to-do item
add_todo() {
    cal
    printf "\033[1;32mEnter the day (DD) as shown in the calendar:\033[0m\n"
    read day
    if ! [[ $day =~ ^[0-9]{1,2}$ ]]; then
        printf "\033[1;31mInvalid day format. Please enter a valid day.\033[0m\n"
        return
    fi
    month=$(date +%m)
    year=$(date +%Y)
    date="$year-$month-$(printf "%02d" $day)"
    printf "\033[1;32mEnter the to-do item:\033[0m\n"
    read item
    if [ -z "$item" ]; then
        printf "\033[1;31mTo-do item cannot be empty.\033[0m\n"
        return
    fi
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "$date - $item (Created at: $timestamp)" >> $TODO_FILE
    printf "\033[1;32mTo-do item added.\033[0m\n"
}

# Function to view the to-do list
view_todo() {
    if [ -f $TODO_FILE ]; then
        # Get the current month and year
        month=$(date +%m)
        year=$(date +%Y)

        # Generate the calendar for the current month
        cal_output=$(cal)

        # Read the to-do file and extract days with to-do items
        days_with_todos=()
        while IFS= read -r line; do
            if [[ $line =~ ^$year-$month-([0-9]{2}) ]]; then
                day=${BASH_REMATCH[1]}
                # Remove leading zero for single-digit days
                day=$(echo $day | sed 's/^0*//')
                days_with_todos+=($day)
            fi
        done < $TODO_FILE

        # Highlight days with to-do items in the calendar
        for day in "${days_with_todos[@]}"; do
            # Use ANSI escape codes to highlight the day in red
            cal_output=$(echo "$cal_output" | sed -E "s/(^| )($day)( |$)/\1\x1b[31m\2\x1b[0m\3/")
        done

        # Display the highlighted calendar
        printf "$cal_output\n"

        # Display the to-do items
        printf "\n\033[1;33mTo-Do List:\033[0m\n"
        cat $TODO_FILE
    else
        printf "\033[1;31mNo to-do items found.\033[0m\n"
    fi
}

# Main loop
while true; do
    show_menu
    read -p "Choose an option [1, 2, 3]: " choice
    case $choice in
        1) add_todo ;;
        2) view_todo ;;
        3) exit 0 ;;
        *) printf "\033[1;31mInvalid option. Please try again.\033[0m\n" ;;
    esac
done