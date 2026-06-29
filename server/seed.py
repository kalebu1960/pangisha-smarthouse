from app import app
from extensions import db

from models.user import User
from models.property import Property
from models.property_image import PropertyImage
from models.favorite import Favorite
from models.inquiry import Inquiry


with app.app_context():

    print("Deleting old data...")

    Favorite.query.delete()
    Inquiry.query.delete()
    PropertyImage.query.delete()
    Property.query.delete()
    User.query.delete()

    db.session.commit()

    print("Creating users...")

    landlord1 = User(
        username="johnlandlord",
        email="john@example.com",
        role="landlord",
        phone_number="0712345678",
    )
    landlord1.set_password("password123")

    landlord2 = User(
        username="marylandlord",
        email="mary@example.com",
        role="landlord",
        phone_number="0798765432",
    )
    landlord2.set_password("password123")

    tenant1 = User(
        username="denis",
        email="denis@example.com",
        role="tenant",
        phone_number="0700111222",
    )
    tenant1.set_password("password123")

    tenant2 = User(
        username="linnet",
        email="linnet@example.com",
        role="tenant",
        phone_number="0700222333",
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
        title="Modern Apartment in Westlands",
        description="A spacious two-bedroom apartment with modern finishes, ample parking, and 24/7 security.",
        price=25000,
        bedrooms=2,
        bathrooms=2,
        property_type="Apartment",
        location_name="Westlands, Nairobi",
        contact_phone="0712345678",
        landlord=landlord1,
    )

    property2 = Property(
        title="Affordable Bedsitter",
        description="Well-maintained bedsitter located close to public transport and shopping centres.",
        price=12000,
        bedrooms=1,
        bathrooms=1,
        property_type="Bedsitter",
        location_name="Roysambu, Nairobi",
        contact_phone="0798765432",
        landlord=landlord2,
    )

    property3 = Property(
        title="Luxury Family Maisonette",
        description="Beautiful three-bedroom maisonette with a private compound and secure neighbourhood.",
        price=45000,
        bedrooms=3,
        bathrooms=3,
        property_type="Maisonette",
        location_name="Kitengela",
        contact_phone="0712345678",
        landlord=landlord1,
    )

    db.session.add_all([
        property1,
        property2,
        property3
    ])

    db.session.commit()

    print("Creating property images...")

    images = [

        # Property 1
        PropertyImage(
            property=property1,
            image_url="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            is_cover=True,
        ),
        PropertyImage(
            property=property1,
            image_url="https://images.unsplash.com/photo-1484154218962-a197022b5858",
        ),
        PropertyImage(
            property=property1,
            image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ),

        # Property 2
        PropertyImage(
            property=property2,
            image_url="https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
            is_cover=True,
        ),
        PropertyImage(
            property=property2,
            image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ),

        # Property 3
        PropertyImage(
            property=property3,
            image_url="https://images.unsplash.com/photo-1570129477492-45c003edd2be",
            is_cover=True,
        ),
        PropertyImage(
            property=property3,
            image_url="https://images.unsplash.com/photo-1449844908441-8829872d2607",
        ),
        PropertyImage(
            property=property3,
            image_url="https://images.unsplash.com/photo-1460317442991-0ec209397118",
        ),
    ]

    db.session.add_all(images)
    db.session.commit()

    print("Creating favorites...")

    favorites = [

        Favorite(
            user_id=tenant1.id,
            property_id=property1.id,
        ),

        Favorite(
            user_id=tenant1.id,
            property_id=property2.id,
        ),

        Favorite(
            user_id=tenant2.id,
            property_id=property3.id,
        ),

    ]

    db.session.add_all(favorites)
    db.session.commit()

    print("Creating inquiries...")

    inquiries = [

        Inquiry(
            tenant_id=tenant1.id,
            property_id=property1.id,
            message="Hi, is this apartment still available?",
        ),

        Inquiry(
            tenant_id=tenant2.id,
            property_id=property2.id,
            message="Can I schedule a viewing this Saturday?",
        ),

        Inquiry(
            tenant_id=tenant1.id,
            property_id=property3.id,
            message="Is the rent negotiable?",
        ),

    ]

    db.session.add_all(inquiries)
    db.session.commit()

    print("\n===================================")
    print(" Pangisha SmartHouse Seed Complete")
    print("===================================")
    print(f"Users: {User.query.count()}")
    print(f"Properties: {Property.query.count()}")
    print(f"Property Images: {PropertyImage.query.count()}")
    print(f"Favorites: {Favorite.query.count()}")
    print(f"Inquiries: {Inquiry.query.count()}")
    print("===================================")