import os

tmp = []

with open('data.txt', 'r', encoding='utf8') as file:
    for line in file:
        l = line.replace('\n', '')
        tmp.append(l)

with open('data_js.txt', 'w', encoding='utf8') as file:
    for line in tmp:
        t = "    { name: '" + line + "' },\n"
        file.write(t)
