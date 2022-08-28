from django.db import models

class Navigation(models.Model):
    label = models.CharField(max_length=200)
    parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)
    url = models.CharField(max_length=200, null=True, blank=True)
    icon = models.CharField(max_length=200, null=True, blank=True)
    order = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return self.label

    @property
    def childrens(self):
        return Navigation.objects.filter(parent=self.pk).order_by("order")
        

    class Meta:
        verbose_name = "Navigation"
        verbose_name_plural = "Navigations"
