"""simple parser to parse inputs from user"""
def parse_file_object(new_file):
    """ used to parse files"""
    dictionary = {}
    key = ''
    value = []
    for line in new_file.readlines():
        if not line.startswith('-'):
            key = line
            value = []
            dictionary[key] = value
        else:
            dictionary[key].append(line)
    return dictionary


def parse_string_input(data):
    """used to parse strings"""
    print(data)
    data_lst = data.splitlines()
    print("from parser")
    print(data_lst)
    dictionary = {}
    key = ''
    value = []
    for line in data_lst:
        if line == '<p>&nbsp;</p>':
            continue
        elif line.startswith('<p>') and not line.startswith('<p>-'):
            key = line
            value = []
            dictionary[key] = value
        else:
            line += '<br />'
            dictionary[key].append(line)
    return dictionary
