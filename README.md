This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# warehouse-optimizator

# warehouse-optimizator

# Item Selection Guide

This guide explains the process of selecting items within the Warehouse Management Component. The component allows you to manage your warehouse inventory efficiently.

## Table of Contents

- [Selecting Items](#selecting-items)
- [Adding Items](#adding-items)
- [Checking Item Availability](#checking-item-availability)
- [Checking Item Duplication](#checking-item-duplication)
- [Dependency Checks](#dependency-checks)
- [Priority Handling](#priority-handling)
- [Space Constraints](#space-constraints)

## Selecting Items

### Adding Items

You can add an item to your inventory by clicking the "Select" button next to the desired item in the warehouse list.

### Checking Item Availability

Before adding an item to your inventory, the component performs several checks to ensure the selection is valid.

### Checking Item Duplication

It checks whether the selected item is already present in your inventory. Duplicating items in your inventory is not allowed.

### Dependency Checks

If the selected item has dependencies, the component ensures that these dependencies are already added to your inventory. Only items with all their dependencies met can be selected.

### Priority Handling

The component automatically manages item priorities:

- High Priority: Items with lower priority numbers are considered high priority (priority field is reversed, lower numbers mean higher priority).
- Value-Based: High-value items are preferred.
- Replacing Items: If the selected item is high priority and space is limited, it will replace the least important item in the warehouse list. The item with the highest priority number (least priority) and the lowest value is replaced. Priority field takes precedence over the value field.
  IMPORTANT NOTE! When we delete an item that is a dependency of another item, so we have a child - parent relationship, we are cascade deleting all the parent relationships also with recursion, this process also occurs when deleting items manually. Example: Coffee Table > Large Sofa > Piano

### Space Constraints

To avoid exceeding the available warehouse space, the component checks the total warehouse space. If your selected items' combined size exceeds the predefined space limit (187), you will not be allowed to add more items.
