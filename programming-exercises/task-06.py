import string
import random

def createDic():
    slownik_25083 = {key: ''.join(random.choices(string.ascii_uppercase + string.digits, k=8)) for key in range(10,21)}
    return slownik_25083


if __name__ == '__main__':
    print(createDic())