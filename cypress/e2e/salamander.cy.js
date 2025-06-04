// cypress/e2e/salamander.cy.js

describe('Centroid Finder UI Tests', () => {
  beforeEach(() => {
    // Mock the GET /api/videos request with static data
    cy.intercept('GET', '/api/videos', {
      statusCode: 200,
      body: ['sample1.mp4', 'sample2.mp4'],
    }).as('getVideos');

    cy.visit('http://localhost:3000');

    // Wait for the mocked API call
    cy.wait('@getVideos');
  });

  it('displays video list and allows preview navigation', () => {
    cy.contains('🎥 Available Videos').should('exist');
    cy.contains('sample1.mp4');
    cy.contains('sample2.mp4');

    cy.contains('sample1.mp4').parent().contains('Preview').click();
    cy.url().should('include', '/preview/sample1.mp4');
  });

  it('loads preview page with controls and canvases', () => {
    cy.visit('http://localhost:3000/preview/sample1.mp4');

    cy.contains('Preview Processing').should('exist');
    cy.get('input[type="color"]').should('exist');
    cy.get('input[type="range"]').should('exist');
    cy.get('canvas').should('have.length', 2);
    cy.contains('Process Video with These Settings').should('exist');
  });

  it('processes a video and displays result status', () => {
    // Mock POST request to start the job
    cy.intercept('POST', '/process/sample1.mp4*', {
      statusCode: 200,
      body: { jobId: 'abc123' },
    }).as('startJob');

    // Mock GET request to poll job status
    cy.intercept('GET', '/process/abc123/status', {
      statusCode: 200,
      body: { status: 'done', result: '/results/sample1.mp4.csv' },
    }).as('pollJob');

    cy.visit('http://localhost:3000/preview/sample1.mp4');
    cy.contains('Process Video with These Settings').click();

    cy.wait('@startJob');
    cy.wait('@pollJob');

    cy.contains('Status: Done!').should('exist');
    cy.contains('Spreadsheet Download')
      .should('have.attr', 'href')
      .and('include', '/results/sample1.mp4.csv');
  });
});
