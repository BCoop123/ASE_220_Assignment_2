import json

# Open the input file and read its contents
with open('data.txt', 'r') as f:
    lines = f.readlines()

# Split the contents into sections using the separator
sections = ''.join(lines).split('* * *\n')

# Create an empty list to hold the JSON data
json_data = []

for section in sections:
    section_data = {}
    # Split the section into lines and use the order of the lines to determine the field names
    lines = section.strip().split('\n')

    section_data['name'] = lines[0]
    section_data['breed'] = lines[1]
    section_data['fixed'] = "N/A"
    section_data['gender'] = lines[3]
    section_data['age'] = "N/A"
    section_data['id'] = "N/A"
    section_data['vacStatus'] = "N/A"
    section_data['location'] = "N/A"
    section_data['available'] = "N/A"
    section_data['type'] = "N/A"
    section_data['details'] = "N/A"

    for i in lines:
        if "Spayed" in i:
            section_data['fixed'] = i
        if "Male" in i or "Female" in i:
            if "-" in i:
                section_data['gender'] = i.split("-")[0]
                section_data['age'] = i.split("-")[1]
            else:
                section_data['gender'] = i
        if "Animal ID" in i:
            section_data['id'] = i.split(":")[1]
        if "Vaccination status" in i:
            section_data['vacStatus'] = i.split(":")[1]
        if "Location" in i:
            section_data['location'] = i.split(":")[1]
        if "Available for" in i:
            section_data['available'] = i.split(":")[1]
        if "Type" in i:
            section_data['type'] = i.split(":")[1]
        if "Additional details" in i:
            section_data['details'] = i.split(":")[1]

    # Add the section data to the list of JSON data
    json_data.append(section_data)

# Write the JSON data to a file
with open('data.json', 'w') as f:
    json.dump(json_data, f)