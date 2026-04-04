import ayurvedaModel from '../model/ayurveda.schema.js';
import unaniModel from '../model/unani.schema.js';
import sidhaModel from '../model/sidha.schema.js';

/**
 * POST /api/medicine/search
 *
 * Request body:
 * {
 *   icd11_code: "SR12",        // optional
 *   disease_name: "Jaundice"   // optional
 * }
 *
 * Search logic:
 * - Ayurveda : match on icd11_code OR disease_name (exact or regex)
 * - Unani    : match on short_defination (regex with disease_name)
 * - Sidha    : match on short_defination (regex with disease_name)
 *
 * At least one of icd11_code or disease_name must be provided.
 */
export async function searchMedicine(req, res) {
    try {
        const { icd11_code, disease_name } = req.body;

        // Validate — at least one must be present
        if (!icd11_code && !disease_name) {
            return res.status(400).json({
                message: 'Please provide at least one of: icd11_code or disease_name',
            });
        }

        // ─── Ayurveda Search ───────────────────────────────────────────────────
        // Match by icd11_code (exact, case-insensitive) OR disease_name (partial regex)
        const ayurvedaQuery = { $or: [] };

        if (icd11_code) {
            ayurvedaQuery.$or.push({
                icd11_code: { $regex: `^${icd11_code}$`, $options: 'i' },
            });
        }

        if (disease_name) {
            ayurvedaQuery.$or.push({
                disease_name: { $regex: disease_name, $options: 'i' },
            });
        }

        const ayurvedaResults = await ayurvedaModel.find(ayurvedaQuery);

        // ─── Unani Search ──────────────────────────────────────────────────────
        // Match on short_defination using disease_name as search term
        // If no disease_name provided, use icd11_code as fallback search term
        const unaniSearchTerm = disease_name || icd11_code;
        const unaniResults = await unaniModel.find({
            short_defination: { $regex: unaniSearchTerm, $options: 'i' },
        });

        // ─── Sidha Search ──────────────────────────────────────────────────────
        // Match on short_defination using disease_name as search term
        // If no disease_name provided, use icd11_code as fallback search term
        const sidhaSearchTerm = disease_name || icd11_code;
        const sidhaResults = await sidhaModel.find({
            short_defination: { $regex: sidhaSearchTerm, $options: 'i' },
        });

        // ─── Response ──────────────────────────────────────────────────────────
        return res.status(200).json({
            query: { icd11_code, disease_name },
            results: {
                ayurveda: ayurvedaResults,
                unani: unaniResults,
                sidha: sidhaResults,
            },
            counts: {
                ayurveda: ayurvedaResults.length,
                unani: unaniResults.length,
                sidha: sidhaResults.length,
            },
        });

    } catch (error) {
        console.error('Error in searchMedicine:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}
