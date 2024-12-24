from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Profile, Category, Product
from .forms import SignUpForm, UpdateUserForm, ChangePasswordForm

class ModelsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.category = Category.objects.create(name='DABABA')
        self.product = Product.objects.create(name='Tiger', category=self.category, description='A powerful DABABA', price=1200)

    def test_profile_creation(self):
        self.assertTrue(Profile.objects.filter(user=self.user).exists())

    def test_category_creation(self):
        self.assertEqual(self.category.name, 'DABABA')

    def test_product_creation(self):
        self.assertEqual(self.product.name, 'Tiger')
        self.assertEqual(self.product.category.name, 'DABABA')

class FormsTestCase(TestCase):
    def test_signup_form_valid(self):
        form = SignUpForm(data={
            'username': 'newuser',
            'password1': 'ComplexP@ssw0rd',
            'password2': 'ComplexP@ssw0rd'
        })
        self.assertTrue(form.is_valid())

    def test_signup_form_invalid(self):
        form = SignUpForm(data={
            'username': 'newuser',
            'password1': 'ComplexP@ssw0rd',
            'password2': 'WrongPassword'
        })
        self.assertFalse(form.is_valid())

    def test_update_user_form(self):
        form = UpdateUserForm(data={'username': 'updateduser'})
        self.assertTrue(form.is_valid())

    def test_password_change_form_invalid(self):
        user = User.objects.create_user(username='testuser2', password='password123')
        form = ChangePasswordForm(user, data={
            'old_password': 'wrongpassword',
            'new_password1': 'NewPassword123',
            'new_password2': 'NewPassword123'
        })
        self.assertFalse(form.is_valid())

class ViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.category = Category.objects.create(name='DABABA')
        self.product = Product.objects.create(name='Tiger', category=self.category, description='A powerful DABABA', price=1200)

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home.html')

    def test_login_view_valid(self):
        response = self.client.post(reverse('login'), {'username': 'testuser', 'password': 'password123'})
        self.assertEqual(response.status_code, 302)  # Redirects to home

    def test_login_view_invalid(self):
        response = self.client.post(reverse('login'), {'username': 'wronguser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 200)  # Stays on login page
        self.assertContains(response, 'There was an error')

    def test_product_view(self):
        response = self.client.get(reverse('product', args=[self.product.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Tiger')

    def test_category_view(self):
        response = self.client.get(reverse('category', args=['DABABA']))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Tiger')

class URLsTestCase(TestCase):
    def test_home_url(self):
        url = reverse('home')
        self.assertEqual(url, '/')

    def test_about_url(self):
        url = reverse('about')
        self.assertEqual(url, '/about/')

    def test_product_url(self):
        url = reverse('product', args=[1])
        self.assertEqual(url, '/product/1/')

    def test_category_url(self):
        url = reverse('category', args=['DABABA'])
        self.assertEqual(url, '/category/DABABA/')
