import { TICKET_STATUS, TICKET_PRIORITY } from '../utils/constants';

// Sample tickets used to pre-populate Local Storage on first launch so the
// dashboard, tables, and charts have realistic data to render immediately.
// Timestamps are generated relative to "now" so the demo always looks fresh.

const daysAgo = (n, hour = 9) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const seedTickets = [
  {
    id: 'TKT-1001',
    employeeName: 'Aarav Mehta',
    employeeId: 'EMP-204',
    department: 'Engineering',
    priority: TICKET_PRIORITY.HIGH,
    subject: 'Unable to access staging server',
    description:
      'I lost SSH access to the staging server after the credential rotation yesterday. I need access restored to continue testing the release branch.',
    status: TICKET_STATUS.IN_PROGRESS,
    assignedTechnician: 'Ravi Kumar',
    comments: [
      {
        id: 'cmt_1',
        author: 'Ravi Kumar',
        message: 'Looking into the credential rotation now, will update shortly.',
        role: 'admin',
        createdAt: daysAgo(2, 11),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(3, 9) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Ravi Kumar', changedAt: daysAgo(2, 11) },
    ],
    createdAt: daysAgo(3, 9),
    updatedAt: daysAgo(2, 11),
  },
  {
    id: 'TKT-1002',
    employeeName: 'Sneha Iyer',
    employeeId: 'EMP-118',
    department: 'Human Resources',
    priority: TICKET_PRIORITY.MEDIUM,
    subject: 'Payslip portal showing incorrect tax deduction',
    description:
      'The payslip generated for last month shows an incorrect tax deduction amount. Could someone from finance/IT verify the calculation?',
    status: TICKET_STATUS.OPEN,
    assignedTechnician: 'Unassigned',
    comments: [],
    history: [{ id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(1, 14) }],
    createdAt: daysAgo(1, 14),
    updatedAt: daysAgo(1, 14),
  },
  {
    id: 'TKT-1003',
    employeeName: 'Karthik Subramanian',
    employeeId: 'EMP-302',
    department: 'IT Support',
    priority: TICKET_PRIORITY.URGENT,
    subject: 'Laptop not booting after Windows update',
    description:
      'My laptop got stuck on a blue screen after last night\'s forced update. I have a client call in 2 hours and need a working machine.',
    status: TICKET_STATUS.IN_PROGRESS,
    assignedTechnician: 'Mark Thompson',
    comments: [
      {
        id: 'cmt_1',
        author: 'Mark Thompson',
        message: 'Grabbing a loaner laptop from the IT store room for you now.',
        role: 'admin',
        createdAt: daysAgo(0, 8),
      },
      {
        id: 'cmt_2',
        author: 'Karthik Subramanian',
        message: 'Thank you, I will swing by in 10 minutes.',
        role: 'employee',
        createdAt: daysAgo(0, 8),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(0, 7) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Mark Thompson', changedAt: daysAgo(0, 8) },
    ],
    createdAt: daysAgo(0, 7),
    updatedAt: daysAgo(0, 8),
  },
  {
    id: 'TKT-1004',
    employeeName: 'Divya Pillai',
    employeeId: 'EMP-156',
    department: 'Finance',
    priority: TICKET_PRIORITY.LOW,
    subject: 'Request for additional expense report template',
    description:
      'Could someone share the quarterly expense report template in Excel format? The one on the intranet link seems to be broken.',
    status: TICKET_STATUS.RESOLVED,
    assignedTechnician: 'Priya Nair',
    comments: [
      {
        id: 'cmt_1',
        author: 'Priya Nair',
        message: 'Uploaded the corrected template to the shared finance drive.',
        role: 'admin',
        createdAt: daysAgo(5, 10),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(6, 9) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Priya Nair', changedAt: daysAgo(6, 12) },
      { id: 'h3', status: TICKET_STATUS.RESOLVED, note: 'Template shared with employee', changedAt: daysAgo(5, 10) },
    ],
    createdAt: daysAgo(6, 9),
    updatedAt: daysAgo(5, 10),
  },
  {
    id: 'TKT-1005',
    employeeName: 'Rohan Desai',
    employeeId: 'EMP-099',
    department: 'Sales',
    priority: TICKET_PRIORITY.MEDIUM,
    subject: 'CRM dashboard not loading lead data',
    description:
      'The CRM dashboard has been stuck on a loading spinner since this morning for all leads tagged "APAC region". Other regions load fine.',
    status: TICKET_STATUS.OPEN,
    assignedTechnician: 'Unassigned',
    comments: [],
    history: [{ id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(0, 10) }],
    createdAt: daysAgo(0, 10),
    updatedAt: daysAgo(0, 10),
  },
  {
    id: 'TKT-1006',
    employeeName: 'Megha Joshi',
    employeeId: 'EMP-211',
    department: 'Marketing',
    priority: TICKET_PRIORITY.LOW,
    subject: 'Need editor access to the brand asset library',
    description:
      'I was added to the marketing team last week but still only have viewer access on the shared brand asset library. Could this be upgraded?',
    status: TICKET_STATUS.CLOSED,
    assignedTechnician: 'Sneha Reddy',
    comments: [
      {
        id: 'cmt_1',
        author: 'Sneha Reddy',
        message: 'Access upgraded to editor. Please refresh and confirm.',
        role: 'admin',
        createdAt: daysAgo(9, 15),
      },
      {
        id: 'cmt_2',
        author: 'Megha Joshi',
        message: 'Confirmed, working great now. Thank you!',
        role: 'employee',
        createdAt: daysAgo(9, 16),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(10, 9) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Sneha Reddy', changedAt: daysAgo(10, 11) },
      { id: 'h3', status: TICKET_STATUS.RESOLVED, note: 'Access upgraded', changedAt: daysAgo(9, 15) },
      { id: 'h4', status: TICKET_STATUS.CLOSED, note: 'Confirmed by employee, closing ticket', changedAt: daysAgo(9, 16) },
    ],
    createdAt: daysAgo(10, 9),
    updatedAt: daysAgo(9, 16),
  },
  {
    id: 'TKT-1007',
    employeeName: 'Vikram Nair',
    employeeId: 'EMP-275',
    department: 'Operations',
    priority: TICKET_PRIORITY.HIGH,
    subject: 'Warehouse inventory sync failing every night',
    description:
      'The nightly inventory sync job between the warehouse scanners and the ERP system has failed for the last 3 nights, leaving stock counts stale.',
    status: TICKET_STATUS.IN_PROGRESS,
    assignedTechnician: 'James Carter',
    comments: [
      {
        id: 'cmt_1',
        author: 'James Carter',
        message: 'Found a timeout issue on the sync job, deploying a fix tonight.',
        role: 'admin',
        createdAt: daysAgo(1, 18),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(2, 8) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to James Carter', changedAt: daysAgo(1, 18) },
    ],
    createdAt: daysAgo(2, 8),
    updatedAt: daysAgo(1, 18),
  },
  {
    id: 'TKT-1008',
    employeeName: 'Ishaan Kapoor',
    employeeId: 'EMP-330',
    department: 'Customer Success',
    priority: TICKET_PRIORITY.MEDIUM,
    subject: 'Zendesk integration not logging call notes',
    description:
      'Call notes from the support line are not showing up in the linked Zendesk tickets since the integration update on Monday.',
    status: TICKET_STATUS.OPEN,
    assignedTechnician: 'Unassigned',
    comments: [],
    history: [{ id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(0, 13) }],
    createdAt: daysAgo(0, 13),
    updatedAt: daysAgo(0, 13),
  },
  {
    id: 'TKT-1009',
    employeeName: 'Tanya Bhatt',
    employeeId: 'EMP-145',
    department: 'Engineering',
    priority: TICKET_PRIORITY.URGENT,
    subject: 'Production API returning 500 errors intermittently',
    description:
      'We are seeing intermittent 500 errors on the /orders endpoint in production, roughly 2-3% of requests over the last hour. Customers are reporting failed checkouts.',
    status: TICKET_STATUS.RESOLVED,
    assignedTechnician: 'Ravi Kumar',
    comments: [
      {
        id: 'cmt_1',
        author: 'Ravi Kumar',
        message: 'Identified a connection pool exhaustion issue, rolled out a hotfix.',
        role: 'admin',
        createdAt: daysAgo(4, 16),
      },
      {
        id: 'cmt_2',
        author: 'Tanya Bhatt',
        message: 'Error rate has dropped to zero on our end, looks resolved.',
        role: 'employee',
        createdAt: daysAgo(4, 17),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(4, 15) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Ravi Kumar', changedAt: daysAgo(4, 15) },
      { id: 'h3', status: TICKET_STATUS.RESOLVED, note: 'Hotfix deployed and verified', changedAt: daysAgo(4, 17) },
    ],
    createdAt: daysAgo(4, 15),
    updatedAt: daysAgo(4, 17),
  },
  {
    id: 'TKT-1010',
    employeeName: 'Naveen Pillai',
    employeeId: 'EMP-061',
    department: 'IT Support',
    priority: TICKET_PRIORITY.LOW,
    subject: 'Request to install design software on workstation',
    description:
      'Could IT please install Figma desktop and Adobe Creative Cloud on my workstation? Approved by my manager, ticket reference attached separately.',
    status: TICKET_STATUS.CLOSED,
    assignedTechnician: 'Mark Thompson',
    comments: [
      {
        id: 'cmt_1',
        author: 'Mark Thompson',
        message: 'Both installed and licensed. Closing this out.',
        role: 'admin',
        createdAt: daysAgo(12, 10),
      },
    ],
    history: [
      { id: 'h1', status: TICKET_STATUS.OPEN, note: 'Ticket created', changedAt: daysAgo(13, 9) },
      { id: 'h2', status: TICKET_STATUS.IN_PROGRESS, note: 'Assigned to Mark Thompson', changedAt: daysAgo(13, 10) },
      { id: 'h3', status: TICKET_STATUS.RESOLVED, note: 'Software installed', changedAt: daysAgo(12, 10) },
      { id: 'h4', status: TICKET_STATUS.CLOSED, note: 'Ticket closed', changedAt: daysAgo(12, 10) },
    ],
    createdAt: daysAgo(13, 9),
    updatedAt: daysAgo(12, 10),
  },
];
