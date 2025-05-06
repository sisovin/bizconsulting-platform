describe('Investment CRUD Operations', () => {
  it('should create a new investment successfully', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment/create');
    cy.get('input[name="name"]').type('Test Investment');
    cy.get('input[name="amount"]').type('1000');
    cy.get('input[name="startDate"]').type('2023-01-01');
    cy.get('input[name="endDate"]').type('2023-12-31');
    cy.get('input[name="interestRate"]').type('5');
    cy.get('button[type="submit"]').click();
    cy.contains('Investment created successfully').should('be.visible');
  });

  it('should update an existing investment successfully', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment/edit/1');
    cy.get('input[name="name"]').clear().type('Updated Investment');
    cy.get('input[name="amount"]').clear().type('2000');
    cy.get('button[type="submit"]').click();
    cy.contains('Investment updated successfully').should('be.visible');
  });

  it('should delete an investment successfully', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment');
    cy.get('button[data-cy="delete-investment-1"]').click();
    cy.contains('Investment deleted successfully').should('be.visible');
  });

  it('should display a list of investments', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment');
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });
});

describe('Mobile Responsiveness', () => {
  it('should display investment form correctly on mobile', () => {
    cy.viewport('iphone-6');
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment/create');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="amount"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display investment list correctly on mobile', () => {
    cy.viewport('iphone-6');
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment');
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });
});

describe('Accessibility Checks', () => {
  it('should have no detectable accessibility violations on investment page', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('should have no detectable accessibility violations on investment form page', () => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/investment/create');
    cy.injectAxe();
    cy.checkA11y();
  });
});
