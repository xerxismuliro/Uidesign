#!/bin/bash
TODO_FILE="ToDoList.txt"
MAX_WIDTH=50

# Function to display the menu
show_menu() {
    printf "\033[1;34m1. Add a to-do item\033[0m\n"
    printf "\033[1;34m2. View to-do list\033[0m\n"
    printf "\033[1;34m3. Delete a to-do item\033[0m\n"
    printf "\033[1;34m4. Exit\033[0m\n"
}

# Function to wrap text to fit within the box width
wrap_text() {
    local text="$1"
    local width="$2"
    local wrapped=""

    while [ ${#text} -gt $width ]; do
        wrapped+="${text:0:$width}\n"
        text="${text:$width}"
    done
    wrapped+="$text"
    printf "$wrapped"
}

# Function to add a to-do item
add_todo() {
    year=$(date +%Y)
    printf "\033[1;32mSelect the month:\033[0m\n"
    for i in {1..12}; do
        month_name=$(date -v${i}m +%B)
        printf "\033[1;34m$i. $month_name\033[0m\n"
    done
    read month
    if ! [[ $month =~ ^[0-9]{1,2}$ ]] || [ $month -lt 1 ] || [ $month -gt 12 ]; then
        printf "\033[1;31mInvalid month selection. Please enter a valid month number.\033[0m\n"
        return
    fi

    cal $month $year
    printf "\033[1;32mEnter the day (DD) as shown in the calendar:\033[0m\n"
    read day
    if ! [[ $day =~ ^[0-9]{1,2}$ ]] || [ $day -lt 1 ] || [ $day -gt 31 ]; then
        printf "\033[1;31mInvalid day format. Please enter a valid day.\033[0m\n"
        return
    fi

    printf "\033[1;32mEnter the event time (HH:MM):\033[0m\n"
    read time
    if ! [[ $time =~ ^([01]?[0-9]|2[0-3]):[0-5][0-9]$ ]]; then
        printf "\033[1;31mInvalid time format. Please enter a valid time.\033[0m\n"
        return
    fi

    date="$year-$(printf "%02d" $month)-$(printf "%02d" $day) $time"
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
    if [ ! -f $TODO_FILE ] || [ ! -s $TODO_FILE ]; then
        printf "\033[1;31mNo to-do items found.\033[0m\n"
        return
    fi

    # Highlight days with to-do items in the calendar
    month=$(date +%m)
    year=$(date +%Y)
    cal_output=$(cal)

    days_with_todos=()
    while IFS= read -r line; do
        if [[ $line =~ ^$year-$month-([0-9]{2}) ]]; then
            day=${BASH_REMATCH[1]}
            day=$(echo $day | sed 's/^0*//') # Remove leading zeros
            days_with_todos+=($day)
        fi
    done < $TODO_FILE

    for day in "${days_with_todos[@]}"; do
        cal_output=$(echo "$cal_output" | sed -E "s/(^| )($day)( |$)/\1\x1b[31m\2\x1b[0m\3/")
    done

    printf "\n$cal_output\n"

    # Table Header
    printf "\n\033[1;33mTo-Do List 🗓️ :\033[0m\n"
    printf "┌$(head -c $((MAX_WIDTH + 2)) < /dev/zero | tr '\0' '─')┐\n"

    count=1
    while IFS= read -r line; do
        datetime=$(echo "$line" | cut -d' ' -f1-2)
        item=$(echo "$line" | cut -d' ' -f4-)
        event_time=$(echo "$datetime" | awk '{print $2}')
        wrapped_datetime=$(wrap_text "$datetime" $MAX_WIDTH)
        wrapped_item=$(wrap_text "$item" $MAX_WIDTH)

        while IFS= read -r wrapped; do
            printf "│ \033[4;32m$(printf "%-*s" $MAX_WIDTH "$wrapped")\033[0m │\n"
        done <<< "$wrapped_datetime"

        while IFS= read -r wrapped; do
            printf "│ \033[0;34m$(printf "%-*s" $MAX_WIDTH "$wrapped")\033[0m │\n"
        done <<< "$wrapped_item"

        printf "│ $(printf "%-*s" $MAX_WIDTH "") │\n"
    done < $TODO_FILE

    printf "└$(head -c $((MAX_WIDTH + 2)) < /dev/zero | tr '\0' '─')┘\n"
}

# Function to delete a to-do item
delete_todo() {
    if [ -f $TODO_FILE ]; then
        view_todo
        printf "\033[1;32mEnter the number of the to-do item to delete:\033[0m\n"
        read number
        if ! [[ $number =~ ^[0-9]+$ ]]; then
            printf "\033[1;31mInvalid number. Please enter a valid number.\033[0m\n"
            return
        fi
        sed -i '' "${number}d" $TODO_FILE
        printf "\033[1;32mTo-do item deleted.\033[0m\n"
    else
        printf "\033[1;31mNo to-do items found.\033[0m\n"
    fi
}

# Function to display the copyright message
display_copyright() {
    echo -e "\033[1;30mScript written by Isaac Muliro\033[0m"
    echo -e "\033[1;30mTerminal color choices by: ANSI escape codes, shell colors, and Bash colors\033[0m"
}


# Main loop
while true; do
    show_menu
    read -p "Choose an option [1, 2, 3, 4]: " choice
    case $choice in
        1) add_todo ;;
        2) view_todo ;;
        3) delete_todo ;;  
        4) exit 0 ;;
        *) printf "\033[1;31mInvalid option. Please try again.\033[0m\n" ;;
    esac
    display_copyright
done































































