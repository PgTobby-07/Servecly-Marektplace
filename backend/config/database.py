from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://274Zmr7wnstVpWK.root:1W2Wy2S029sQ1yRy@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/test?ssl_ca=/etc/ssl/certs/ca-certificates.crt"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
