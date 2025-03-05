#Należy wykorzystać plik wordlist_10000.txt i stworzyć funkcję wyszukującą najdłuższy wyraz w tym pliku oraz drugą funkcję, która wyszuka wyrazy o długości 10.

f = open("wordlist_10000.txt", "r")
wordlist = f.readlines()
f.close()

def longest_word():
    print(max((word.strip() for word in wordlist), key=len))

def words_of_10_length():
    print([word.strip() for word in wordlist if len(word.strip()) == 10])

if __name__ == "__main__":
    longest_word()
    words_of_10_length()