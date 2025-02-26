import math
def listComprehension():
    return [math.sqrt(i) for i in range(1,257) if math.sqrt(i) %2 == 0]

if __name__ == "__main__":
    print(listComprehension())