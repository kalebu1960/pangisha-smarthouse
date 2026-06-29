from app import app
from extensions import db

from models.user import User
from models.property import Property
from models.favorite import Favorite
from models.inquiry import Inquiry


with app.app_context():

    print("Deleting old data...")

    Favorite.query.delete()
    Inquiry.query.delete()
    Property.query.delete()
    User.query.delete()

    db.session.commit()

    print("Creating users...")

    landlord1 = User(
        username="johnlandlord",
        email="john@example.com",
        role="landlord",
        phone_number="0712345678"
    )
    landlord1.set_password("password123")

    landlord2 = User(
        username="marylandlord",
        email="mary@example.com",
        role="landlord",
        phone_number="0798765432"
    )
    landlord2.set_password("password123")

    tenant1 = User(
        username="denis",
        email="denis@example.com",
        role="tenant",
        phone_number="0700111222"
    )
    tenant1.set_password("password123")

    tenant2 = User(
        username="linnet",
        email="linnet@example.com",
        role="tenant",
        phone_number="0700222333"
    )
    tenant2.set_password("password123")

    db.session.add_all([
        landlord1,
        landlord2,
        tenant1,
        tenant2
    ])

    db.session.commit()

    print("Creating properties...")

    property1 = Property(
    title="Modern Apartment",
    description="...",
    price=25000,
    bedrooms=2,
    bathrooms=2,
    property_type="Apartment",
    location_name="Westlands",
    latitude=-1.2676,
    longitude=36.8108,
    contact_phone="0712345678",
    landlord=landlord1
    )

    

db.session.add(property1)
db.session.commit()

from models.property_image import PropertyImage

images = [

    PropertyImage(
        image_url="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        property=property1,
        is_cover=True
    ),

    PropertyImage(
        image_url="https://images.unsplash.com/photo-1484154218962-a197022b5858",
        property=property1
    ),

    PropertyImage(
        image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        property=property1
    )

]

db.session.add_all(images)

    property2 = Property(
        title="Luxury Bedsitter",
        description="Affordable bedsitter close to the CBD.",
        price=12000,
        bedrooms=1,
        bathrooms=1,
        property_type="Bedsitter",
        image_url="https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
        location_name="Roysambu, Nairobi",
        latitude=-1.2167,
        longitude=36.8833,
        contact_phone="0798765432",
        landlord=landlord2
    )

    property3 = Property(
        title="Three Bedroom Maisonette",
        description="Perfect family house with a private compound.",
        price=45000,
        bedrooms=3,
        bathrooms=3,
        property_type="Maisonette",
        image_url="https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        location_name="Kitengela",
        latitude=-1.4833,
        longitude=36.9500,
        contact_phone="0712345678",
        landlord=landlord1
    )

    db.session.add_all([
        property1,
        property2,
        property3
    ])

    db.session.commit()

    print("Creating favorites...")

    favorite1 = Favorite(
        user_id=tenant1.id,
        property_id=property1.id
    )

    favorite2 = Favorite(
        user_id=tenant2.id,
        property_id=property3.id
    )

    db.session.add_all([
        favorite1,
        favorite2
    ])

    db.session.commit()

    print("Creating inquiries...")

    inquiry1 = Inquiry(
        message="Is this apartment still available?",
        tenant_id=tenant1.id,
        property_id=property1.id
    )

    inquiry2 = Inquiry(
        message="Can I schedule a viewing this weekend?",
        tenant_id=tenant2.id,
        property_id=property2.id
    )

    db.session.add_all([
        inquiry1,
        inquiry2
    ])

    db.session.commit()

    print("=================================")
    print(" Pangisha SmartHouse Seeded!")
    print("=================================")
    print("Landlords: 2")
    print("Tenants: 2")
    print("Properties: 3")
    print("Favorites: 2")
    print("Inquiries: 2")