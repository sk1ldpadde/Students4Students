import re


email_pattern = r'\binf[0-9][0-9][0-9][0-9][0-9]+@lehre.dhbw-stuttgart.de\b'
"""
Regular expression pattern for matching DHBW Stuttgart email addresses.
One example is the following email: inf12345@lehre.dhbw-stuttgart.de

IMPORTANT: 
use of '\b' word boundaries to ensure the input has no extra 
characters before or after it (potential SQL Injection)
"""

password_pattern = r'\b[0-9a-fA-F]{64}\b'
"""
Regular expression for matching passwords handled as SHA256 hashes.
Example password: 1234
SHA256 hash: 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
"""
