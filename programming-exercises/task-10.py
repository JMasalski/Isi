def fun10():
    alfabet1 = ''.join(chr(i) for i in range(97, 123))

    with open("alfabet1-25083.txt", "x") as f:
        f.write(alfabet1)


    with open("alfabet2-25083.txt", "x") as f:
        for letter in alfabet1:
            f.write(letter + "\n")


if __name__ == "__main__":
    fun10()
