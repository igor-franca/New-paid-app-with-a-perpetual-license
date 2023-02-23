const headers = {
	Authorization: 'Basic ' + btoa('test@liferay.com:test'),
	'Content-Type': 'application/json',
};

export function createApp({
	appDescription,
	appName,
	catalogId,
}: {
	appDescription: string;
	appName: string;
	catalogId: number;
}) {
	return fetch(
		'http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products',
		{
			body: JSON.stringify({
				active: true,
				catalogId,
				description: { en_US: appDescription },
				name: { en_US: appName },
				productType: 'simple',
			}),
			headers,
			method: 'POST',
		}
	);
}

export async function createAppLicensePrice({
	body,
	appProductId,
}: {
	body: Object;
	appProductId: number;
}) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/${appProductId}/skus
	  `,
		{
			body: JSON.stringify(body),
			headers,
			method: 'POST',
		}
	);
	return await response.json();
}

export function createAttachment({
	body,
	externalReferenceCode,
}: {
	body: Object;
	externalReferenceCode: string;
}) {
	return fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/attachments`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'POST',
		}
	);
}

export function createImage({
	body,
	externalReferenceCode,
}: {
	body: Object;
	externalReferenceCode: string;
}) {
	return fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/images`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'POST',
		}
	);
}

export async function createProductSpecification({
	body,
	appId,
}: {
	body: Object;
	appId: string;
}) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/${appId}/productSpecifications`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'POST',
		}
	);

	return await response.json();
}

export async function createProductSubscriptionConfiguration({
	body,
	externalReferenceCode,
}: {
	body: Object;
	externalReferenceCode: string;
}) {
	fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/subscriptionConfiguration`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'PATCH',
		})
};

export async function createSpecification({ body }: { body: Object }) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/specifications`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'POST',
		}
	);

	return await response.json();
}

type Product = {
	name: {[key: string] : string};
	externalReferenceCode: string;
	modifiedDate: string;
	productId: number;
	thumbnail: string;
	workflowStatusInfo: {
		code: number;
		label: string;
		label_i18n: string;
	}
}

export async function getAllProducts({
    catalogId,
}: {
    catalogId: number;
}) {
    const response = await fetch(
        `http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products?filter=catalogId%20eq%20${catalogId}
        `,
        {
            headers,
            method: 'GET',
        }
    );
    return await response.json() as {items : Product[]};
}

export async function getCatalogs() {
	const response = await fetch(
		'http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/catalogs',
		{ headers, method: 'GET' }
	);

	return response.json();
}

export async function getProduct({ appERC }: { appERC: string }) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${appERC}
		`,
		{
			headers,
			method: 'GET',
		}
	);
	return await response.json();
}

export async function getProductImages({
	appProductId,
}: {
	appProductId: number;
}) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/${appProductId}/images`,
		{
			headers,
			method: 'GET',
		}
	);
	return await response.json();
}

export async function getProductSKU({
	appProductId,
}: {
	appProductId: number;
}) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/${appProductId}/skus`,
		{
			headers,
			method: 'GET',
		}
	);
	return await response.json();
}

export type ProductSpecifications = {
	id : number;
	optionCategoryId : number;
	priority : number;
	productId : number; 
	specificationId : number;
	specificationKey : string;
	value : {[key : string] : string}
}

export async function getProductSpecifications({
	appProductId,
}: {
	appProductId: number;
}) {
	const response = await fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/${appProductId}/productSpecifications`,
		{
			headers,
			method: 'GET',
		}
	);

	return await response.json() as {items : ProductSpecifications[]};
}

export function patchAppByExternalReferenceCode({
	body,
	externalReferenceCode,
}: {
	body: Object;
	externalReferenceCode: string;
}) {
	return fetch(
		`http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/patchProductByExternalReferenceCode`,
		{
			body: JSON.stringify(body),
			headers,
			method: 'PATCH',
		}
	);
}
