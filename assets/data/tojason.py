import json

# Open the input file and read its contents
with open('data.txt', 'r') as f:
    lines = f.readlines()

# Split the contents into sections using the separator
sections = ''.join(lines).split('* * *\n')

# Create an empty list to hold the JSON data
json_data = []

for section in sections:
    # Create an empty dictionary to hold the field data for this section
    section_data = {}

    # Split the section into lines and use the order of the lines to determine the field names
    lines = section.strip().split('\n')

    # Fill missing lines with null
    lines += [None] * (10 - len(lines))

    # Add the field values to the dictionary in the specified order
    section_data['name'] = lines[0]
    section_data['breed'] = lines[1]

    # Check if the line for 'fixed' starts with 'Spayed'
    if lines[2] is not None and lines[2].startswith('Spayed'):
        section_data['fixed'] = lines[2]
        section_data['gender'] = lines[3]
        section_data['id'] = lines[4]
        section_data['v-status'] = lines[5]
        section_data['location'] = lines[6]
        section_data['available'] = lines[7]
        section_data['type'] = lines[8]
        section_data['details'] = lines[9]
    else:
        section_data['fixed'] = 'Not Spayed/Neutered'
        section_data['gender'] = lines[2]
        section_data['id'] = lines[3]
        section_data['v-status'] = lines[4]
        section_data['location'] = lines[5]
        section_data['available'] = lines[6]
        section_data['type'] = lines[7]
        section_data['details'] = lines[8]



    # Add the section data to the list of JSON data
    json_data.append(section_data)

# Write the JSON data to a file
with open('data.json', 'w') as f:
    json.dump(json_data, f)

