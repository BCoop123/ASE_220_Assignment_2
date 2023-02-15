import json

# Open the text file and read in each line as a separate item in a list
with open('pictures.txt', 'r') as f:
    image_links = f.read().splitlines()

# Create a dictionary to hold the image links
data = {'image_links': image_links}

# Write the dictionary to a JSON file
with open('pictures.json', 'w') as f:
    json.dump(data, f)
