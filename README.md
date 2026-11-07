# Shopoint

Shopoint is a responsive e-commerce product browsing application built with React, TypeScript, Vite, React Router, and Tailwind CSS. Users can browse products, inspect product details, search, filter by category/brand/price, and navigate paginated results.

## 1. Setup instructions

### Prerequisites

- Node.js (an LTS version is recommended)
- npm

### Install and run

```bash
# Clone the repository
git clone <repository-url>
cd Shopoint

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Vite prints the local development URL in the terminal (commonly `http://localhost:5173`). Open that URL in your browser.

### Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Run TypeScript project builds and create the production bundle
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## 2. Assumptions made

### Sidebar open and close

- The sidebar is open by default when the application starts.
- The menu button in the header toggles the sidebar's visibility.
- On mobile layouts, a closed sidebar is hidden so the product listing can occupy the available screen.
- On desktop layouts, the sidebar's width transitions between its expanded width and zero; the product grid adjusts its column count based on whether the sidebar is open.
- Closing the sidebar does not clear or change selected filters. Filter values are managed independently through URL search parameters.

### Product images gallery

- The product detail response may include an array of images. The first image is selected initially.
- When a product has no `images` entries, its `thumbnail` is used as the fallback gallery image.
- Thumbnail controls are shown only when the product has more than one image. Selecting a thumbnail changes the main image.
- When the product ID changes, the selected image resets to the first image for the newly displayed product.
- Thumbnail buttons include accessible labels and an `aria-pressed` state.

### Real-time search

- The header search field updates as the user types. Search text is synchronized to the `q` query parameter, and the listing logic filters product titles using a case-insensitive substring match.
- Search trims leading and trailing whitespace. Applying a search removes the `page` parameter so the result set starts at page one.
- When searching from the listing page, existing category, brand, and price query parameters are retained. Searching from another route starts with a fresh listing query.
- Clearing search removes the `q` parameter.

## 3. Architectural decisions

### Project structure

The project groups components by their role and keeps data access separate from screen logic:

```text
src/
├── assets/
│   └── icons/                         # Header icons
├── components/
│   ├── Atomic/                        # Small reusable presentation pieces
│   │   ├── EmptyStateUI.tsx
│   │   ├── LoaderUI.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── ProductsCard.tsx
│   │   ├── Ratings.tsx
│   │   └── SearchInput.tsx
│   ├── UI/                            # Reusable composed interface elements
│   │   ├── Header/
│   │   │   ├── index.tsx
│   │   │   └── view/useHeader.ts
│   │   ├── Pagination/
│   │   ├── ProductDetailsCard/
│   │   └── Sidebar/
│   └── Pages/                         # Route-level screens
│       ├── NotFound/
│       ├── ProductDetails/
│       │   ├── index.tsx
│       │   └── view/useProductDetails.ts
│       └── ProductListing/
│           ├── index.tsx
│           └── view/useProductListing.ts
├── hooks/
│   ├── useDebounce.ts
│   └── useFiltersLogic.ts
├── lib/
│   └── api/
│       ├── apiClient.ts
│       ├── endpoints.ts
│       └── services/productsService.ts
├── App.tsx
├── index.css
└── main.tsx
```

### MVVM-inspired architecture

The application uses an MVVM-inspired separation of responsibilities implemented with React components and custom hooks:

- **Model:** Product and product-detail types, API client, endpoint definitions, and service functions in `src/lib/api/` represent and retrieve application data.
- **View:** React components render the interface and forward user actions through props and event handlers.
- **ViewModel:** Page- and UI-specific hooks coordinate state, data loading, URL state, filtering, pagination, and interaction handlers. Examples include `useProductListing`, `useProductDetails`, and `useHeader`; shared URL filter behavior is handled by `useFiltersLogic`.

This keeps most view components focused on rendering and makes behavior easier to reuse and test. It is an MVVM-inspired React structure, not a strict or framework-enforced MVVM implementation.

### Atomic, UI, and Pages component layers

- **Atomic:** Small, focused components such as product cards, ratings, search input, loaders, skeletons, and empty states. They are intended to be reusable and receive data/actions through props.
- **UI:** Larger reusable components such as the header, sidebar, pagination, and product details card. These compose Atomic components and provide shared interface patterns.
- **Pages:** Route-level screens for product listing, product details, and not-found handling. Page components connect the corresponding ViewModel hooks with the UI components and define screen-level composition.

## 4. Improvements with more time

### Performance optimization

- Use route-based code splitting and lazy loading for the product details and not-found routes to reduce the initial JavaScript payload.
- Optimize product imagery with responsive sizes, modern formats (WebP/AVIF), explicit dimensions, and lazy loading for off-screen images.
- Consider a caching and request-deduplication layer (such as TanStack Query) to reduce repeated API requests and improve loading behavior.
- Add request cancellation with `AbortController` and handle stale responses, rather than relying only on mounted-state guards.
- Avoid fetching the entire catalog if the data source supports server-side filtering, search, and pagination.

### SEO and accessibility

- Add route-specific page titles, meta descriptions, canonical links, and Open Graph metadata.
- Consider SSR or prerendering for product listing and detail routes; a client-rendered Vite SPA may expose limited product content in the initial HTML to search crawlers.
- Add valid Schema.org Product and Breadcrumb structured data, using accurate product price, availability, and rating values.
- Improve semantic markup and accessibility: meaningful image alt text, accessible names for icon controls, keyboard-operable navigation, visible focus indicators, and appropriate heading hierarchy.
- Audit color contrast and announce loading, error, and result updates where appropriate. Test the sidebar and image gallery with keyboard navigation and assistive technology.

### Logic and maintainability

- Add validation and clear feedback for invalid price ranges (negative values, non-numeric values, and minimum price greater than maximum).
- Make URL state behavior consistent for search, filters, pagination, and browser back/forward navigation; add tests for these interactions.
- Debounce search using the existing `useDebounce` hook if the search flow is intended to reduce frequent URL updates or support a remote search endpoint. Ensure the input remains responsive while only the applied query is delayed.
- Improve search matching to include brand, category, and tags, or use the API's search endpoint for larger catalogs.
- Add robust API error messages and retry controls, and cover services, filtering, pagination, and gallery behavior with unit and integration tests.
- Remove development-only console logging and centralize error handling and formatting utilities.
- Add explicit sorting options and define consistent behavior for filter changes (for example, resetting pagination to page one).

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- ESLint

## Data source

Product and category requests are handled by the service layer in `src/lib/api/services/productsService.ts`, using the shared API client and endpoint definitions. The configured endpoints determine the backing data source.
