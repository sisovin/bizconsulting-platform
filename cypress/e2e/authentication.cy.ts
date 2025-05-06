describe('User Registration Journey', () => {
  it('should register a new user successfully', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Registration successful').should('be.visible');
  });

  it('should show an error for invalid email', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email address').should('be.visible');
  });

  it('should show an error for missing password', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Password is required').should('be.visible');
  });
});

describe('Authentication Edge Cases', () => {
  it('should show an error for incorrect password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should show an error for non-existent email', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('nonexistent@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should handle token expiration gracefully', () => {
    // Simulate token expiration and check for appropriate handling
  });
});

describe('Mobile Responsiveness', () => {
  it('should display registration form correctly on mobile', () => {
    cy.viewport('iphone-6');
    cy.visit('/register');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display login form correctly on mobile', () => {
    cy.viewport('iphone-6');
    cy.visit('/login');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});

describe('Accessibility Checks', () => {
  it('should have no detectable accessibility violations on registration page', () => {
    cy.visit('/register');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('should have no detectable accessibility violations on login page', () => {
    cy.visit('/login');
    cy.injectAxe();
    cy.checkA11y();
  });
});
