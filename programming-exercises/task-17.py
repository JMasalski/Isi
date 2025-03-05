class Dog:
    def __init__(self, name, age, coat_color):
        self.name = name
        self.age = age
        self.coat_color = coat_color

    def sound(self):
        print(f"{self.name} is barking!")



dog1 = Dog("Azor", 2, "Black")
dog2 = Dog("Lucyfer", 3, "Blue")
dog3 = Dog("Amir", 1, "Brown")


dog1.sound()
dog2.sound()
dog3.sound()
