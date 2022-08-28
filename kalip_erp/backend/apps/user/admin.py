from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from apps.user.models import User, UserAddress

class UserAdmin(UserAdmin):
    model = User
    list_display = ['id', 'username',]

admin.site.register(User, UserAdmin)


@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'title',
        'username',
        'state',
        'city',
        'full_name',
        'mobile',
        'active',
        'created_at',
    ]

    def username(self, obj):
        return obj.user.username