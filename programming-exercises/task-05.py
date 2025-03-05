import math

def sposob1():
    return [math.sqrt(num) for num in range(1, 257) if num % 2 == 0]

def sposob2():
    sqrt_list = []
    for num in range(1,257):
        if num % 2== 0:
            sqrt_list.append(math.sqrt(num))
    return sqrt_list

if __name__ == "__main__":
    print(sposob1())
    print(sposob2())