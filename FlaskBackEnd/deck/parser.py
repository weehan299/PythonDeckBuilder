import base64
import uuid

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
    # print(data)
    data_lst = data.splitlines()
    print("from parser")
    # print(data_lst)
    dictionary = {'allAnkiImages':[]}
    key = ''
    value = []
    for line in data_lst:
        if line == '<p>&nbsp;</p>':
            continue
        elif line.startswith('<p>') and not line.startswith('<p>-'):
            if line.startswith('<p><img'):
                imageName = parse_img_tag(line)
                front = '<pre><img src="'
                end = '" /></pre>'
                dictionary['allAnkiImages'].append(imageName)
                line = front + imageName + end
                print("excuted once")
            key = line
            value = []
            dictionary[key] = value
        else:
            if line.startswith('<p>-<img'):
                front = '<pre>-<img src="'
                end = '" /></pre>'
                imageName = parse_img_tag(line)
                dictionary['allAnkiImages'].append(imageName)
                line = front + imageName + end
                print("excuted once")
            line += '<br />'
            dictionary[key].append(line)
    print(dictionary)
    return dictionary


def parse_img_tag(line):
    # if line.startswith('<p><img'):
    #     front = '<pre><img src="'
    # elif line.startswith('<p>-<img'):
    #     front = '<pre>-<img src="'
    # end = '" /></pre>'
    
    starter = line.find(",")
    b64_string = line[starter+1:-8]
    filename = str(uuid.uuid4())+".png"
    with open(filename, "wb") as fh:
        b = base64.decodebytes(b64_string.encode()+b'===')
        fh.write(b)
    # res = front + filename + end
    return filename
