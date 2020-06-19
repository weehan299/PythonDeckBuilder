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
    data_lst = data.splitlines()
    dictionary = {}
    key = ''
    value = []
    for line in data_lst:
        if not line.startswith('-'):
            key = line
            value = []
            dictionary[key] = value
        else:
            line += '<br /> <br />'
            dictionary[key].append(line)
    return dictionary
