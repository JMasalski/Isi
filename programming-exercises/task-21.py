class Animal:
    def __init__(self, name, age, sex):
        self.name = name
        self.age = age
        self.sex = sex

    def sound(self):
        print(f"{self.name} głos!")


class Dog(Animal):
    def __init__(self, breed,name,age,sex):
        super().__init__(name, age, sex)
        self.breed = breed

    def sound(self):
        print(f"{self.name} szczeka!")


class Cat(Animal):
    def __init__(self, breed, name, age, sex):
        super().__init__(name, age, sex)
        self.breed = breed

    def sound(self):
        print(f"{self.name} miałczy!")


class Fox(Animal):
    def sound(self):
        print(f"{self.name} wyje!")


dog1 = Dog("Labrador", "Reksio", 5, "Male")
dog2 = Dog("Husky", "Luna", 3, "Female")

cat1 = Cat("Persian", "Mruczek", 4, "Male")
cat2 = Cat("Siamese", "Mia", 2, "Female")

fox1 = Fox("Fenek", 6, "Male")

animals = [dog1, dog2, cat1, cat2, fox1]

for animal in animals:
    print(f"Name: {animal.name}, Age: {animal.age}, Sex: {animal.sex}")
    animal.sound()
    print("-" * 40)