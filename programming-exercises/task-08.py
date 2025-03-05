import string
import random
from collections import Counter

def fun08():
    randWord =''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=100))
    randWordDict = Counter(randWord)
    randWordTuple = list(randWordDict.items())
    print("Losowy ciąg:", randWord, "\n")
    print("Słownik zliczeń:", randWordDict, "\n")
    print("Lista krotek:", randWordTuple)

if __name__ == '__main__':
    fun08()