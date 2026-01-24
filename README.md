# shoply

1. Auth Service

Kimlik doğrulama servisi

Sorumluluklar:

User register

Login

Refresh token

Access token üretimi

Password reset

MFA. opsiyonel

Teknik:

JWT. kısa ömürlü

Refresh token DB veya Redis

OAuth2 desteklenebilir

DB:

users

credentials

refresh_tokens

Bu servis:

Ürün bilmez

Sipariş bilmez

Sadece identity bilir

2. User Service

Kullanıcı profili ve domain bilgisi

Sorumluluklar:

Profil bilgileri

Adresler

Fatura bilgileri

User preferences

Auth Service ile fark:

Auth. kimliktir

User Service. business user’dır

DB:

users

addresses

preferences

3. Catalog Service

Ürün dünyasının beyni

Sorumluluklar:

Category

Brand

Product

Attributes

Variants

Images

SEO data

Asla yapmaz:

Stock düşmez

Price hesaplamaz

Order bilmez

DB:

categories

products

attributes

variants

4. Pricing Service

Fiyat tek başına servis olmalı. evet

Sorumluluklar:

Base price

Campaign price

Discount rules

Dynamic pricing

Region based pricing

Sebep:

Kampanya işi karmaşıktır

Catalog’u kirletmezsin

DB:

prices

discounts

campaigns

5. Inventory Service

Stok tek başına yaşar

Sorumluluklar:

Stock count

Stock reservation

Stock release

Low stock alerts

ÖNEMLİ:

Sipariş anında stok düşmez

Önce reserve edilir

DB:

product_stock

reservations


7. Order Service

Business’ın kalbi

Sorumluluklar:

Order creation

Order status

Order lifecycle

Saga orchestration

Order states:

CREATED

PAYMENT_PENDING

PAID

SHIPPED

COMPLETED

CANCELLED

DB:

orders

order_items

order_events

8. Payment Service

En izole servis

Sorumluluklar:

Payment intent

External provider integration

Webhook handling

Payment confirmation

Asla:

Order update etmez

Stock update etmez

Event yayınlar:

PaymentSucceeded

PaymentFailed

9. Shipping Service

Lojistik tarafı

Sorumluluklar:

Shipment creation

Tracking number

Shipping status

DB:

shipments

carriers

10. Notification Service

Cross-cutting servis

Sorumluluklar:

Email

SMS

Push

Webhook

Dinler:

Order events

Payment events

Shipping events

4. Supporting servisler. Production’da şart
11. Search Service

ElasticSearch

Catalog event’leri dinler

Read optimized

12. Review Service

Product reviews

Rating

Moderation

13. Admin Service

Admin panel backend

Role based access

Audit logs

5. Servisler arası ilişki. Kim kime konuşur

Özet tablo:

Servis	Senkron	Async
API Gateway	Auth, Catalog	–
Order	Payment, Inventory	Order events
Payment	External	Payment events
Inventory	–	Stock events
Notification	–	Her şeyi dinler


docker exec -it shoply_postgres psql -U postgres

\l              -- List all databases
\c shoply_auth  -- Connect to a database
\dt             -- List tables
\d User         -- View User table schema
\q              -- Exit

<!-- view data in table -->
docker exec -it shoply_postgres psql -U postgres -d shoply_auth -c "SELECT * FROM \"User\";"