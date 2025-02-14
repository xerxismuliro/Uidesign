
# #!/bin/bash
# TODO_FILE="ToDoList.txt"  # File to store to-do items
# MAX_WIDTH=50  # Maximum width for the box frame

# # Function to display the menu
# show_menu() {
#     printf "\033[1;34m1. Add a to-do item\033[0m\n"
#     printf "\033[1;34m2. View to-do list\033[0m\n"
#     printf "\033[1;34m3. Exit\033[0m\n"
# }

# # Function to prompt for a date
# prompt_date() {
#     local prompt="$1"
#     local format="$2"
#     local error_msg="$3"
#     local input

#     while true; do
#         printf "\033[1;32m${prompt}:\033[0m\n"
#         read input
#         if [[ $input =~ $format ]]; then
#             echo "$input"
#             return
#         else
#             printf "\033[1;31m${error_msg}\033[0m\n"
#         fi
#     done
# }

# # Function to add a to-do item
# add_todo() {
#     printf "\033[1;32mDo you want to add a to-do item for a different month? (y/n):\033[0m\n"
#     read change_month

#     if [[ $change_month =~ ^[Yy]$ ]]; then
#         month=$(prompt_date "Enter the month (MM)" '^[0-9]{1,2}$' "Invalid month format. Please enter a valid month.")
#         year=$(prompt_date "Enter the year (YYYY)" '^[0-9]{4}$' "Invalid year format. Please enter a valid year.")
#     else
#         month=$(date +%m)
#         year=$(date +%Y)
#     fi

#     cal $month $year
#     printf "\033[1;32mEnter the day (DD) as shown in the calendar:\033[0m\n"
#     read day
#     if ! [[ $day =~ ^[0-9]{1,2}$ ]]; then
#         printf "\033[1;31mInvalid day format. Please enter a valid day.\033[0m\n"
#         return
#     fi

#     # Prompt for the time of the event
#     printf "\033[1;32mEnter the time of the event (HH:MM, 24-hour format):\033[0m\n"
#     read event_time
#     if ! [[ $event_time =~ ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$ ]]; then
#         printf "\033[1;31mInvalid time format. Please enter a valid time in HH:MM format.\033[0m\n"
#         return
#     fi

#     # Format the date and time
#     date="$year-$month-$(printf "%02d" $day)"
#     datetime="$date $event_time"

#     printf "\033[1;32mEnter the to-do item:\033[0m\n"
#     read item
#     if [ -z "$item" ]; then
#         printf "\033[1;31mTo-do item cannot be empty.\033[0m\n"
#         return
#     fi

#     timestamp=$(date +"%Y-%m-%d %H:%M:%S")
#     printf "%s - %s - %s\n" "$datetime" "$timestamp" "$item" >> $TODO_FILE
#     printf "\033[1;32mTo-do item added.\033[0m\n"
# }

# # Function to wrap text to fit within the box width
# wrap_text() {
#     local text="$1"
#     local width="$2"
#     local wrapped=""

#     while [ ${#text} -gt $width ]; do
#         wrapped+="${text:0:$width}\n"
#         text="${text:$width}"
#     done
#     wrapped+="$text"
#     printf "$wrapped"
# }

# # Function to view the to-do list in the terminal
# view_todo_terminal() {
#     printf "\033[1;32mDo you want to view a different month? (y/n):\033[0m\n"
#     read change_month

#     if [[ $change_month =~ ^[Yy]$ ]]; then
#         month=$(prompt_date "Enter the month (MM)" '^[0-9]{1,2}$' "Invalid month format. Please enter a valid month.")
#         year=$(prompt_date "Enter the year (YYYY)" '^[0-9]{4}$' "Invalid year format. Please enter a valid year.")
#     else
#         month=$(date +%m)
#         year=$(date +%Y)
#     fi

#     cal_output=$(cal $month $year)
#     days_with_todos=()
#     max_length=0

#     while IFS= read -r line; do
#         if [[ $line =~ ^$year-$month-([0-9]{2}) ]]; then
#             day=${BASH_REMATCH[1]}
#             day=$(echo $day | sed 's/^0*//')
#             days_with_todos+=($day)
#         fi
#         line_length=${#line}
#         if [ $line_length -gt $max_length ]; then
#             max_length=$line_length
#         fi
#     done < $TODO_FILE

#     box_width=$((max_length > MAX_WIDTH ? MAX_WIDTH : max_length))

#     for day in "${days_with_todos[@]}"; do
#         cal_output=$(echo "$cal_output" | sed -E "s/(^| )($day)( |$)/\1\x1b[31m\2\x1b[0m\3/")
#     done

#     printf "$cal_output\n"
#     printf "\n\033[1;33mTo-Do List 🕰️ :\033[0m\n"
#     printf "┌$(head -c $((box_width + 2)) < /dev/zero | tr '\0' '─')┐\n"

#     while IFS= read -r line; do
#         datetime=$(echo "$line" | cut -d'-' -f1-2)
#         item=$(echo "$line" | cut -d'-' -f4-)
#         wrapped_datetime=$(wrap_text "$datetime" $box_width)
#         wrapped_item=$(wrap_text "$item" $box_width)

#         while IFS= read -r wrapped; do
#             printf "│ \033[1;32m$(printf "%-*s" $box_width "$wrapped")\033[0m │\n"
#         done <<< "$wrapped_datetime"

#         while IFS= read -r wrapped; do
#             printf "│ $(printf "%-*s" $box_width "$wrapped") │\n"
#         done <<< "$wrapped_item"

#         printf "│ $(printf "%-*s" $box_width "") │\n"
#     done < $TODO_FILE

#     printf "└$(head -c $((box_width + 2)) < /dev/zero | tr '\0' '─')┘\n"
# }

# # Function to view the to-do list in the browser
# view_todo_browser() {
#     html_file="todo_list.html"
#     {
#         cat <<EOF
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>To-Do List</title>
#     <link rel="stylesheet" href="styles.css">
#     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
# </head>
# <body>
#     <script src="constructUi.min.js"></script>
#     <script src="calendar.min.js"></script>
#     <script src="search.js"></script>
# </body>
# </html>
# EOF
#     } > $html_file

#     open $html_file
# }

# # Function to view the to-do list
# view_todo() {
#     printf "\033[1;32mDo you want to view the to-do list in the browser? (y/n):\033[0m\n"
#     read view_in_browser

#     if [[ $view_in_browser =~ ^[Yy]$ ]]; then
#         view_todo_browser
#     else
#         view_todo_terminal
#     fi
# }



# # Main loop
# while true; do
#     show_menu
#     read -p "Choose an option [1, 2, 3]: " choice
#     case $choice in
#         1) add_todo ;;
#         2) view_todo ;;
#         3) exit 0 ;;
#         *) printf "\033[1;31mInvalid option. Please try again.\033[0m\n" ;;
#     esac
# done






#!/bin/bash
TODO_FILE="ToDoList.txt"  # File to store to-do items
MAX_WIDTH=50  # Maximum width for the box frame

# Function to display the menu
show_menu() {
    printf "\033[1;34m1. Add a to-do item\033[0m\n"
    printf "\033[1;34m2. View to-do list\033[0m\n"
    printf "\033[1;34m3. Exit\033[0m\n"
}

# Function to prompt for a date
prompt_date() {
    local prompt="$1"
    local format="$2"
    local error_msg="$3"
    local input

    while true; do
        printf "\033[1;32m${prompt}:\033[0m\n"
        read input
        if [[ $input =~ $format ]]; then
            echo "$input"
            return
        else
            printf "\033[1;31m${error_msg}\033[0m\n"
        fi
    done
}

# Function to add a to-do item
add_todo() {
    printf "\033[1;32mDo you want to add a to-do item for a different month? (y/n):\033[0m\n"
    read change_month

    if [[ $change_month =~ ^[Yy]$ ]]; then
        month=$(prompt_date "Enter the month (MM)" '^[0-9]{1,2}$' "Invalid month format. Please enter a valid month.")
        year=$(prompt_date "Enter the year (YYYY)" '^[0-9]{4}$' "Invalid year format. Please enter a valid year.")
    else
        month=$(date +%m)
        year=$(date +%Y)
    fi

    cal $month $year
    printf "\033[1;32mEnter the day (DD) as shown in the calendar:\033[0m\n"
    read day
    if ! [[ $day =~ ^[0-9]{1,2}$ ]]; then
        printf "\033[1;31mInvalid day format. Please enter a valid day.\033[0m\n"
        return
    fi

    # Prompt for the time of the event
    printf "\033[1;32mEnter the time of the event (HH:MM, 24-hour format):\033[0m\n"
    read event_time
    if ! [[ $event_time =~ ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$ ]]; then
        printf "\033[1;31mInvalid time format. Please enter a valid time in HH:MM format.\033[0m\n"
        return
    fi

    # Format the date and time
    date="$year-$month-$(printf "%02d" $day)"
    datetime="$date $event_time"

    printf "\033[1;32mEnter the to-do item:\033[0m\n"
    read item
    if [ -z "$item" ]; then
        printf "\033[1;31mTo-do item cannot be empty.\033[0m\n"
        return
    fi

    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    printf "%s - %s - %s\n" "$datetime" "$timestamp" "$item" >> $TODO_FILE
    printf "\033[1;32mTo-do item added.\033[0m\n"
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

# Function to view the to-do list in the terminal
view_todo_terminal() {
    printf "\033[1;32mDo you want to view a different month? (y/n):\033[0m\n"
    read change_month

    if [[ $change_month =~ ^[Yy]$ ]]; then
        month=$(prompt_date "Enter the month (MM)" '^[0-9]{1,2}$' "Invalid month format. Please enter a valid month.")
        year=$(prompt_date "Enter the year (YYYY)" '^[0-9]{4}$' "Invalid year format. Please enter a valid year.")
    else
        month=$(date +%m)
        year=$(date +%Y)
    fi

    cal_output=$(cal $month $year)
    days_with_todos=()
    max_length=0

    while IFS= read -r line; do
        if [[ $line =~ ^$year-$month-([0-9]{2}) ]]; then
            day=${BASH_REMATCH[1]}
            day=$(echo $day | sed 's/^0*//')
            days_with_todos+=($day)
        fi
        line_length=${#line}
        if [ $line_length -gt $max_length ]; then
            max_length=$line_length
        fi
    done < $TODO_FILE

    box_width=$((max_length > MAX_WIDTH ? MAX_WIDTH : max_length))

    for day in "${days_with_todos[@]}"; do
        cal_output=$(echo "$cal_output" | sed -E "s/(^| )($day)( |$)/\1\x1b[31m\2\x1b[0m\3/")
    done

    printf "$cal_output\n"
    printf "\n\033[1;33mTo-Do List 🕰️ :\033[0m\n"
    printf "┌$(head -c $((box_width + 2)) < /dev/zero | tr '\0' '─')┐\n"

    while IFS= read -r line; do
        datetime=$(echo "$line" | cut -d'-' -f1-2)
        item=$(echo "$line" | cut -d'-' -f4-)
        wrapped_datetime=$(wrap_text "$datetime" $box_width)
        wrapped_item=$(wrap_text "$item" $box_width)

        while IFS= read -r wrapped; do
            printf "│ \033[1;32m$(printf "%-*s" $box_width "$wrapped")\033[0m │\n"
        done <<< "$wrapped_datetime"

        while IFS= read -r wrapped; do
            printf "│ $(printf "%-*s" $box_width "$wrapped") │\n"
        done <<< "$wrapped_item"

        printf "│ $(printf "%-*s" $box_width "") │\n"
    done < $TODO_FILE

    printf "└$(head -c $((box_width + 2)) < /dev/zero | tr '\0' '─')┘\n"
}

# Function to view the to-do list in the browser
view_todo_browser() {
    html_file="todo_list.html"
    {
        cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <script src="constructUi.min.js"></script>
    <script src="calendar.min.js"></script>
    <script src="search.js"></script>
</body>
</html>
EOF
    } > $html_file

    open $html_file
}

# Function to view the to-do list
view_todo() {
    view_todo_terminal
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