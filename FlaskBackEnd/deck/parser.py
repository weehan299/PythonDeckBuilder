def parse_file_object(f):
    dictionary = {}
    key = ''
    value = []
    for line in f.readlines():
        if not line.startswith('-'):
            key = line
            value = []
            dictionary[key] = value
        else:
            dictionary[key].append(line)
    return dictionary

def parse_string_input(data):
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

