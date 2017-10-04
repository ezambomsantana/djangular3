from django.db import models

class House(models.Model):
    HOUSE_TYPE = (
        ('AP', 'Apartment'),
        ('HO', 'House')
    )
    address = models.CharField(max_length=256)
    house_type = models.CharField(max_length=2, choices=HOUSE_TYPE)
    def to_dict_json(self):
    	return {
    		'address': self.address,
    	}

class Camera(models.Model):
    name = models.CharField(max_length=256)
    house = models.ForeignKey(House, on_delete=models.CASCADE)

    def to_dict_json(self):
    	return {
    		'name': self.name,
    	}
