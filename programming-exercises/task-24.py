import csv

with open('pc.csv', 'w', newline='') as csvfile:
    fieldsname = ['pc_name', 'ip']
    writer = csv.DictWriter(csvfile, fieldnames=fieldsname)
    writer.writeheader()
    for i in range(1, 101):
        writer.writerow({'pc_name': f'P{i}', 'ip':f'172.30.2.{i}'})
    print('File created successfully')
