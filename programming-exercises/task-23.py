import string
import random
def genPass():
    f = open("passwords.txt", "w")
    for i in range(1000):
        password=''.join(random.choices(string.ascii_letters + string.digits, k=6))
        f.write(password + "\n")
    f.close()
    print("Hasła wygenerowane i zapisane w passwords.txt")

if __name__ == '__main__':
    genPass()